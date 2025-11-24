import { sendWechatNotification } from '../utils/offlineChecker.js';
import { sendSmsNotification } from '../utils/smsSender.js';

export const initNotifyListener = (bus, opts = {}) => {
    bus.on('event:alerts.guidance.persisted', async (event) => {
        try {
            // the DB listener may have attached _record with {id, created}
            const rec = event._record;
            const created = rec?.created === true;
            const tbmcode = event.tbmcode;
            const ringNo = event.ringNo;

            if (!created) {
                console.log(`[EventBus][Notify] Skipping notifications for tbm=${tbmcode} ring=${ringNo} because event was not created`);
                return;
            }

            const message = event.message;

            // Await WeChat (primary channel)
            try {
                await sendWechatNotification(message);
                console.log(`[EventBus][Notify] WeChat sent for tbm=${tbmcode} ring=${ringNo}`);
            } catch (werr) {
                console.error(`[EventBus][Notify] WeChat failed for tbm=${tbmcode} ring=${ringNo}:`, werr);
            }

            // Fire-and-forget SMS
            sendSmsNotification({ content: message })
                .then((res) => console.log(`[EventBus][Notify] SMS sent for tbm=${tbmcode} ring=${ringNo}`, res))
                .catch((serr) => console.error(`[EventBus][Notify] SMS failed for tbm=${tbmcode} ring=${ringNo}:`, serr?.message || serr));
        } catch (err) {
            console.error('[EventBus][Notify] listener error:', err);
        }
    });
};
