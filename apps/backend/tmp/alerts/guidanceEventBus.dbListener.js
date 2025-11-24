import { recordThresholdEvent } from './alertsRepository.js';
import { publishEvent } from '../eventbus/eventBus.js';

export const initDbListener = (bus, opts = {}) => {
    bus.on('event:alerts.guidance', async (event) => {
        try {
            const { tbmcode, ringNo, severity, payload, metrics, meta } = event;
            console.log(`[EventBus][DB] Received event for tbm=${tbmcode} ring=${ringNo} severity=${severity}`);

            // Build a human-readable message from metrics and TBM metadata.
            // Prefer metadata names and include unit and severity flag per metric.
            const { getTbmMetadata, getParameterMetadata } = await import('../datastore/metadataStore.js');
            const tbmMeta = getTbmMetadata(tbmcode) || {};
            const headerParts = [tbmMeta?.projectShortName, tbmMeta?.tunnelName, tbmMeta?.tbmName].filter(Boolean);
            const readableName = headerParts.length ? headerParts.join(' / ') : tbmcode || '未知设备';

            const detailsLines = (Array.isArray(metrics) ? metrics : []).map((m) => {
                const paramMeta = getParameterMetadata(m.paramCode) || {};
                const label = paramMeta?.name || m.paramCode;
                const unit = m.unit ? ` ${m.unit}` : '';
                const flag = m.severity === 'critical' ? ' 🚨严重超限' : ' ⚠️超限';
                return `${label}: ${m.value}${unit}${flag}`;
            });

            const highestSeverity = (Array.isArray(metrics) ? metrics : []).some((m) => m.severity === 'critical')
                ? '严重超限'
                : '超限';

            // fetch thresholds to display the configured warning threshold in the message header
            const { getThresholdsForTbm } = await import('../datastore/thresholdStore.js');
            let displayThreshold = 50;
            try {
                const th = await getThresholdsForTbm(tbmcode);
                displayThreshold = th?.defaultWarning ?? displayThreshold;
            } catch (e) {
                // ignore, keep default
            }

            const header = `😟 ${readableName} / 导向环号: ${ringNo} 导向指标${highestSeverity}（>${displayThreshold}）`;
            const message = `${header}\n${detailsLines.join('\n')}`;

            const rec = await recordThresholdEvent({
                tbmcode,
                ringNo,
                severity,
                message,
                payload,
                metrics,
                notifiedChannels: [],
            });
            console.log(`[EventBus][DB] recordThresholdEvent returned id=${rec?.id} created=${rec?.created}`);
            // attach record info back on the event for downstream listeners
            event._record = rec;
            // publish persisted topic so notify listeners only run after persistence
            try {
                publishEvent('alerts.guidance.persisted', event);
                console.log('[EventBus][DB] published alerts.guidance.persisted for event id=', rec?.id);
            } catch (pubErr) {
                console.error('[EventBus][DB] failed to publish persisted event:', pubErr);
            }
        } catch (err) {
            console.error('[EventBus][DB] failed to persist event:', err);
        }
    });
};
