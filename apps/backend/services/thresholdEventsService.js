import { supabase } from "../utils/supabase/client.js";

const AUTO_RESOLVE_STATUS = "resolved";
const DEFAULT_RESOLUTION_STATUSES = ["pending", "in_progress"];
const RESOLUTION_ACTOR_SYSTEM = "system";
const SUPPORTED_SEVERITIES = new Set(["normal", "warning", "critical"]);
const SEVERITY_ALIASES = {
    extreme: "critical",
};

const normalizeRingNo = (value) => {
    if (value === null || value === undefined || value === "" || value === "-") return null;
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
    return null;
};

const normalizeRangeValues = (range) => {
    if (range === null || range === undefined) return null;
    if (!Array.isArray(range)) return null;
    const normalized = range
        .map((value) => {
            if (value === null || value === undefined || value === "") return null;
            const numeric = Number(value);
            return Number.isFinite(numeric) ? numeric : null;
        })
        .filter((value) => value !== null);
    return normalized.length ? normalized : null;
};

const mergeChannels = (existing = [], incoming = []) => {
    const accumulator = Array.isArray(existing) ? [...existing] : [];
    if (!Array.isArray(incoming) || incoming.length === 0) return accumulator;
    for (const channel of incoming) {
        if (!accumulator.includes(channel)) {
            accumulator.push(channel);
        }
    }
    return accumulator;
};

const applyRingFilter = (query, normalizedRingNo) => {
    if (normalizedRingNo === null) {
        return query.is("ring_no", null);
    }
    return query.eq("ring_no", normalizedRingNo);
};

const resolveSeverities = async ({ tbmId, normalizedRingNo, paramId, severities, resolvedBy }) => {
    if (!tbmId || !paramId || !Array.isArray(severities) || severities.length === 0) return;

    const nowIso = new Date().toISOString();

    let query = supabase
        .from("realtime_threshold_events")
        .update({
            resolution_status: AUTO_RESOLVE_STATUS,
            resolved_at: nowIso,
            resolved_by: resolvedBy ?? RESOLUTION_ACTOR_SYSTEM,
        })
        .eq("tbm_id", tbmId)
        .eq("param_id", paramId)
        .in("severity", severities)
        .in("resolution_status", DEFAULT_RESOLUTION_STATUSES);

    query = applyRingFilter(query, normalizedRingNo);

    const { error } = await query;
    if (error) {
        console.warn(
            "[thresholdEventsService] resolveSeverities failed:",
            error.message || error,
        );
    }
};

export const recordThresholdEvent = async ({
    tbmId,
    ringNo,
    paramId,
    severity,
    message,
    payload,
    metricValue: rawMetricValue = null,
    normalRange: explicitNormalRange,
    notifiedChannels = [],
    resolvedBy = RESOLUTION_ACTOR_SYSTEM,
}) => {
    //console.log("===recordThresholdEvent===", tbmId);
    try {

        if (!tbmId) {
            throw new Error("recordThresholdEvent requires tbmId");
        }

        if (ringNo === null || ringNo === undefined) {
            throw new Error("recordThresholdEvent requires ringNo");
        }

        if (!paramId) {
            throw new Error("recordThresholdEvent requires paramId");
        }

        if (!severity) {
            throw new Error("recordThresholdEvent requires severity");
        }

        const normalizedRingNo = normalizeRingNo(ringNo);
        if (normalizedRingNo === null) {
            throw new Error("recordThresholdEvent requires a valid ringNo");
        }

        const severityLower = String(severity).toLowerCase();
        const severityCanonical = SEVERITY_ALIASES[severityLower] ?? severityLower;
        if (!SUPPORTED_SEVERITIES.has(severityCanonical)) {
            throw new Error(`Unsupported severity "${severity}"`);
        }

        const metricValue = (() => {
            const value = rawMetricValue !== null && rawMetricValue !== undefined ? Number(rawMetricValue) : null;
            return Number.isFinite(value) ? value : null;
        })();

        const normalRangeProvided = explicitNormalRange !== undefined;
        const normalRange = normalRangeProvided ? normalizeRangeValues(explicitNormalRange) : undefined;

        if (severityCanonical === "normal") {
            await resolveSeverities({
                tbmId,
                normalizedRingNo,
                paramId,
                severities: ["warning", "critical"],
                resolvedBy,
            });
            return { resolved: true };
        }

        const severitiesToResolve = severityCanonical === "warning" ? ["critical"] : ["warning"];
        await resolveSeverities({
            tbmId,
            normalizedRingNo,
            paramId,
            severities: severitiesToResolve,
            resolvedBy,
        });

        let existingQuery = supabase
            .from("realtime_threshold_events")
            .select("id, notified_channels, metric_value, resolution_status")
            .eq("tbm_id", tbmId)
            .eq("param_id", paramId)
            .eq("severity", severityCanonical)
            .limit(1);

        existingQuery = applyRingFilter(existingQuery, normalizedRingNo);

        const { data: existing, error: existingErr } = await existingQuery;
        if (existingErr) throw existingErr;

        const nowIso = new Date().toISOString();        
        const payloadProvided = payload !== undefined;


        if (existing && existing.length) {
            const ex = existing[0];

            // Determine if the metric value increased compared to existing record.
            const prevMetric = (ex.metric_value !== null && ex.metric_value !== undefined) ? Number(ex.metric_value) : null;
            const newMetric = (metricValue !== null && metricValue !== undefined) ? Number(metricValue) : null;
            // Consider absolute magnitude change to handle negative values correctly
            const prevAbs = Number.isFinite(prevMetric) ? Math.abs(prevMetric) : null;
            const newAbs = Number.isFinite(newMetric) ? Math.abs(newMetric) : null;
            const increased = (Number.isFinite(newMetric) && (prevAbs === null || !Number.isFinite(prevAbs) || newAbs > prevAbs+10));

            if (increased) {
                // Full update when metric increased
                const updates = {
                    resolution_status: "pending",
                    resolved_at: null,
                    resolved_by: null,
                    triggered_at: nowIso,
                    metric_value: metricValue,
                    notified_channels: mergeChannels(ex.notified_channels, notifiedChannels),
                };

                if (normalRangeProvided) {
                    updates.normal_range = normalRange ?? null;
                }

                if (payloadProvided) {
                    updates.payload = payload ?? null;
                }

                const { error: updateErr } = await supabase
                    .from("realtime_threshold_events")
                    .update(updates)
                    .eq("id", ex.id);

                if (updateErr) throw updateErr;

                return { id: ex.id, created: false, updated: true };
            }

            // Not increased: only ensure resolution_status is 'pending' (minimal write)
            const currentStatus = ex.resolution_status ?? null;
            if (currentStatus !== "pending") {
                const { error: statusErr } = await supabase
                    .from("realtime_threshold_events")
                    .update({ resolution_status: "pending" })
                    .eq("id", ex.id);
                if (statusErr) throw statusErr;
                return { id: ex.id, created: false, updated: false, statusSetToPending: true };
            }

            // Already pending, skip writes
            return { id: ex.id, created: false, updated: false, skipped: true };
        }

        const insertPayload = {
            tbm_id: tbmId,
            ring_no: normalizedRingNo,
            param_id: paramId,
            severity: severityCanonical,
            metric_value: metricValue,
            normal_range: normalRangeProvided ? normalRange ?? null : null,
            message: message ?? null,
            payload: payload ?? null,
            notified_channels: Array.isArray(notifiedChannels) ? notifiedChannels : [],
            resolution_status: "pending",
            resolved_at: null,
            resolved_by: null,
            triggered_at: nowIso,
        };

        const { data: inserted, error: insertErr } = await supabase
            .from("realtime_threshold_events")
            .insert(insertPayload)
            .select("id")
            .single();

        if (insertErr) throw insertErr;
        return { id: inserted?.id ?? null, created: true };
    } catch (err) {
        console.error("❌ Failed to record threshold event:", err);
        throw err;
    }
};

export const findOpenEventsByTbmAndParam = async ({ tbmId, paramId }) => {
    try {
        if (!tbmId || !paramId) return [];

        const { data, error } = await supabase
            .from("realtime_threshold_events")
            .select("*")
            .eq("tbm_id", tbmId)
            .eq("param_id", paramId)
            .in("resolution_status", DEFAULT_RESOLUTION_STATUSES);

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error("❌ Failed to query open events:", err);
        return [];
    }
};

export const findOpenEventsByTbm = async (tbmId) => {
    try {
        if (!tbmId) return { events: [], byParam: {}, byEvent: {} };

        const { data: events, error } = await supabase
            .from("realtime_threshold_events")
            .select("id,severity,message,payload,resolution_status,resolved_at,ring_no,param_id,metric_value,normal_range")
            .eq("tbm_id", tbmId)
            .in("resolution_status", DEFAULT_RESOLUTION_STATUSES);

        if (error) throw error;
        if (!events || !events.length) return { events: [], byParam: {}, byEvent: {} };

        const byParam = {};
        const byEvent = {};

        for (const event of events) {
            const key = event.param_id;
            if (!key) continue;
            if (!byParam[key]) byParam[key] = [];
            byParam[key].push(event);
            byEvent[event.id] = [key];
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
        const candidates = [AUTO_RESOLVE_STATUS, "closed"];
        const now = new Date().toISOString();
        for (const status of candidates) {
            try {
                const { error } = await supabase
                    .from("realtime_threshold_events")
                    .update({ resolution_status: status, resolved_at: now })
                    .in("id", eventIds);
                if (error) throw error;
                return true;
            } catch (err) {
                console.warn(
                    `[thresholdEventsService] autoResolveEvents: failed to set resolution_status ${status}:`,
                    err?.message || err,
                );
            }
        }
        throw new Error("Failed to auto-resolve events with any candidate resolution_status");
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

export const findOpenThresholdEvent = async ({
    tbmId,
    ringNo = null,
    paramId = null,
    severity,
    resolutionStatuses,
}) => {
    if (!tbmId || !severity || !paramId) return null;

    let query = supabase
        .from("realtime_threshold_events")
        .select("*")
        .eq("tbm_id", tbmId)
        .eq("severity", severity)
        .eq("param_id", paramId)
        .limit(1);

    const normalizedRingNo = normalizeRingNo(ringNo);
    query = applyRingFilter(query, normalizedRingNo);

    const statuses = Array.isArray(resolutionStatuses) && resolutionStatuses.length
        ? resolutionStatuses
        : DEFAULT_RESOLUTION_STATUSES;
    query = query.in("resolution_status", statuses);

    const { data, error } = await query.single();
    if (error && error.code !== "PGRST116") throw error;
    return data || null;
};
