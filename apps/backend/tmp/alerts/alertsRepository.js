import { supabase } from "../db.js";

const AUTO_RESOLVE_STATUS = "acknowledged";

const normalizeParamKey = (value) => {
    if (!value && value !== 0) return "all";
    return String(value).trim().toLowerCase().replace(/\s+/g, "_") || "all";
};

const resolveParamContext = async (metrics = []) => {
    const fallback = { paramId: null, paramCode: null, paramName: null, normalizedKey: "all" };
    const primary = Array.isArray(metrics) && metrics.length ? metrics[0] : null;
    if (!primary) return fallback;

    let paramId = primary.paramId ?? null;
    const paramCode = primary.paramCode ?? null;
    let paramName = primary.paramName ?? null;

    const computeKey = () => normalizeParamKey(paramName || paramCode || "all");

    if (paramId != null) {
        return { paramId, paramCode, paramName, normalizedKey: computeKey() };
    }

    try {
        const { getParameterMetadata } = await import("../datastore/metadataStore.js");
        if (paramCode) {
            const meta = getParameterMetadata(paramCode);
            if (meta) {
                paramId = meta.id ?? paramId;
                paramName = paramName || meta.name || null;
            }
        }
    } catch (err) {
        console.warn("[alertsRepository] metadata cache lookup failed:", err?.message || err);
    }

    if (paramId == null && paramCode) {
        try {
            const { data, error } = await supabase
                .from("tbm_runtime_parameters")
                .select("id,name")
                .eq("code", paramCode)
                .maybeSingle();

            if (error) {
                console.warn("[alertsRepository] remote parameter lookup failed:", error.message || error);
            } else if (data) {
                paramId = data.id ?? paramId;
                paramName = paramName || data.name || null;
            }
        } catch (remoteErr) {
            console.error("[alertsRepository] remote parameter lookup threw:", remoteErr);
        }
    }

    return { paramId: paramId ?? null, paramCode, paramName, normalizedKey: computeKey() };
};

export const recordThresholdEvent = async ({
    tbmId,
    ringNo,
    severity,
    message,
    payload,
    metrics = [],
    notifiedChannels = [],
}) => {
    try {
        const { paramId, normalizedKey } = await resolveParamContext(metrics);
        const primaryMetric = Array.isArray(metrics) && metrics.length ? metrics[0] : null;

        const metricValue = (() => {
            if (!primaryMetric) return null;
            const value = Number(primaryMetric.value);
            return Number.isFinite(value) ? value : null;
        })();

        const normalRange = (() => {
            if (!primaryMetric) return null;

            if (Array.isArray(primaryMetric.range) && primaryMetric.range.length) {
                const normalized = primaryMetric.range
                    .map((v) => {
                        if (v === null || v === undefined || v === "") return null;
                        const num = Number(v);
                        return Number.isFinite(num) ? num : null;
                    })
                    .filter((v) => v !== null);
                return normalized.length >= 2 ? normalized.slice(0, 2) : null;
            }

            const bounds = primaryMetric.bounds;
            if (bounds && typeof bounds === "object") {
                const lowCandidate = bounds.warning_low ?? bounds.critical_low ?? null;
                const highCandidate = bounds.warning_high ?? bounds.critical_high ?? null;
                const low = lowCandidate !== null ? Number(lowCandidate) : null;
                const high = highCandidate !== null ? Number(highCandidate) : null;
                if (Number.isFinite(low) && Number.isFinite(high)) {
                    return [low, high];
                }
            }

            if (primaryMetric.threshold !== null && primaryMetric.threshold !== undefined) {
                const limit = Number(primaryMetric.threshold);
                if (Number.isFinite(limit)) {
                    return [-limit, limit];
                }
            }

            return null;
        })();

        let existingQuery = supabase
            .from("realtime_threshold_events")
            .select("id, notified_channels, ack_status, metric_value, normal_range")
            .eq("tbm_id", tbmId)
            .eq("ring_no", ringNo ?? null)
            .eq("severity", severity);

        if (paramId != null) {
            existingQuery = existingQuery.eq("param_id", paramId);
        } else {
            existingQuery = existingQuery.eq("param_key", normalizedKey);
        }

        const { data: existing, error: existingErr } = await existingQuery.limit(1);
        if (existingErr) throw existingErr;

        if (existing && existing.length) {
            const ex = existing[0];
            const mergedChannels = Array.from(new Set([...(ex.notified_channels || []), ...(notifiedChannels || [])]));
            if (mergedChannels.length !== (ex.notified_channels || []).length) {
                await supabase
                    .from("realtime_threshold_events")
                    .update({ notified_channels: mergedChannels })
                    .eq("id", ex.id);
            }

            const updates = {};
            if (metricValue !== null && metricValue !== undefined && metricValue !== ex.metric_value) {
                updates.metric_value = metricValue;
            }
            const shouldUpdateRange = (() => {
                if (!normalRange || !Array.isArray(normalRange)) return false;
                if (!Array.isArray(ex.normal_range)) return true;
                if (normalRange.length !== ex.normal_range.length) return true;
                return normalRange.some((value, idx) => Number(value) !== Number(ex.normal_range[idx]));
            })();
            if (shouldUpdateRange) {
                updates.normal_range = normalRange;
            }

            if (Object.keys(updates).length) {
                await supabase
                    .from("realtime_threshold_events")
                    .update(updates)
                    .eq("id", ex.id);
            }
            return { id: ex.id, created: false };
        }

        let eventId = null;
        try {
            const { data, error } = await supabase
                .from("realtime_threshold_events")
                .insert({
                    tbm_id: tbmId,
                    ring_no: ringNo ?? null,
                    severity,
                    message,
                    payload: payload ?? null,
                    notified_channels: notifiedChannels,
                    param_key: normalizedKey,
                    param_id: paramId,
                    metric_value: metricValue,
                    normal_range: normalRange,
                })
                .select("id")
                .single();

            if (error) throw error;
            eventId = data?.id ?? null;
        } catch (insertErr) {
            console.warn("[alertsRepository] insert failed, attempting recovery:", insertErr?.message || insertErr);

            let recoveryQuery = supabase
                .from("realtime_threshold_events")
                .select("id")
                .eq("tbm_id", tbmId)
                .eq("ring_no", ringNo ?? null)
                .eq("severity", severity);

            if (paramId != null) {
                recoveryQuery = recoveryQuery.eq("param_id", paramId);
            } else {
                recoveryQuery = recoveryQuery.eq("param_key", normalizedKey);
            }

            const { data: recovery, error: recoveryErr } = await recoveryQuery.limit(1);
            if (!recoveryErr && recovery && recovery.length) {
                eventId = recovery[0].id;
                return { id: eventId, created: false };
            }

            throw insertErr;
        }

        if (eventId && metrics.length) {
            const rows = metrics.map((metric) => ({
                event_id: eventId,
                param_code: metric.paramCode,
                param_name: metric.paramName ?? null,
                value: metric.value ?? null,
                unit: metric.unit ?? null,
                threshold: metric.threshold ?? null,
                severity: metric.severity ?? "normal",
            }));

            const { error: metricsError } = await supabase
                .from("realtime_threshold_event_metrics")
                .insert(rows);

            if (metricsError) throw metricsError;
        }

        return { id: eventId, created: true };
    } catch (err) {
        console.error("❌ Failed to record threshold event:", err);
        throw err;
    }
};

export const findOpenEventsByTbmAndParam = async (tbmcode, paramCode) => {
    try {
        const { byParam } = await findOpenEventsByTbm(tbmcode);
        return byParam[paramCode] || [];
    } catch (err) {
        console.error("❌ Failed to query open events:", err);
        return [];
    }
};

export const findOpenEventsByTbm = async (tbmcode) => {
    try {
        const { data: events, error } = await supabase
            .from("realtime_threshold_events")
            .select("id,severity,message,payload,ack_status,ring_no,param_id,param_key,metric_value,normal_range")
            .eq("tbm_code", tbmcode);

        if (error) throw error;
        if (!events || !events.length) return { events: [], byParam: {}, byEvent: {} };

        const eventIds = events.map((e) => e.id).filter(Boolean);

        const { data: metrics, error: metricsError } = await supabase
            .from("realtime_threshold_event_metrics")
            .select("event_id,param_code")
            .in("event_id", eventIds);

        if (metricsError) throw metricsError;

        const byParam = {};
        const byEvent = {};
        for (const m of metrics || []) {
            if (!m || !m.param_code) continue;
            byParam[m.param_code] = byParam[m.param_code] || [];
            const ev = events.find((e) => e.id === m.event_id);
            if (ev) byParam[m.param_code].push(ev);

            byEvent[m.event_id] = byEvent[m.event_id] || [];
            byEvent[m.event_id].push(m.param_code);
        }

        return { events, byParam, byEvent };
    } catch (err) {
        console.error("❌ Failed to bulk query open events:", err);
        return { events: [], byParam: {}, byEvent: {} };
    }
};

export const autoResolveEvents = async (eventIds) => {
    if (!Array.isArray(eventIds) || !eventIds.length) return;
    try {
        const candidates = [AUTO_RESOLVE_STATUS, "resolved", "closed", "auto_resolved"];
        const now = new Date().toISOString();
        for (const status of candidates) {
            try {
                const { error } = await supabase
                    .from("realtime_threshold_events")
                    .update({ ack_status: status, ack_by: "system", ack_at: now })
                    .in("id", eventIds);
                if (error) throw error;
                return true;
            } catch (err) {
                console.warn(`[alertsRepository] autoResolveEvents: failed to set status ${status}:`, err?.message || err);
            }
        }
        throw new Error("Failed to auto-resolve events with any candidate ack_status");
    } catch (err) {
        console.error("❌ Failed to auto-resolve events:", err);
        return false;
    }
};

export const getEventById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("realtime_threshold_events")
            .select("*")
            .eq("id", id)
            .maybeSingle();
        if (error) throw error;
        return data || null;
    } catch (err) {
        console.error("❌ Failed to get event by id:", err);
        return null;
    }
};
