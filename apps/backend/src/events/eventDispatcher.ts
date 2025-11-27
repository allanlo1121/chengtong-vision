import { subscribeEvent } from "../core/eventbus/eventBus.js";
import { logger } from "../core/logger.js";
import { saveOperationalEvent } from "../domain/tbm/tbmOperationalEventService.js";
import { upsertActiveOperationalEvent } from "../domain/tbm/tbmActiveOperationalEventService.js";

import { getRecipientsForAlarm } from "@domain/tbm/alarmNotificationService.js";

import { formatConnectivity } from "@notify/templates/connectivityMessages.js";

import { notifyAllChannels } from "@/notify/notifyAllChannels.js";

import { AlarmType } from "@models/alarm-type.types.js";
import type { AlarmEvent } from "@models/alarm-event.types.js";
import type { Recipient } from "@models/notification/recipient.types";


const CONNECTIVITY_TOPICS = [
  "HEARTBEAT_OFFLINE",
  "HEARTBEAT_RECOVERED",
  "PLC_OFFLINE",
  "PLC_RECOVERED",
  "RING_VALIDATION"
];

export function initEventDispatcher() {
  CONNECTIVITY_TOPICS.forEach((topic) => {
    subscribeEvent(topic, async (ev) => {
      logger.info(`📥 EVENT RECEIVED: ${topic} TBM=${ev.tbmId}`);

      // 1. 写入历史表
      await saveOperationalEvent(ev);

      // 2. 写入 active 表（或删除）
      await upsertActiveOperationalEvent(ev);

      // 3. 统一发送通知
      await dispatchNotification(ev);
    });
  });
}



const HANDLERS = {
  [AlarmType.CONNECTIVITY]: formatConnectivity,
  [AlarmType.GUIDANCE]: formatConnectivity,
  [AlarmType.ADVANCE]: formatConnectivity,
  [AlarmType.SAFETY]: formatConnectivity,
};

/**
 * 统一通知路由（WeCom / SMS / Email …）
 */
async function dispatchNotification(ev: AlarmEvent) {
  const formatter = HANDLERS[ev.alarmType];
  if (!formatter) return;

  const msg = await formatter(ev);

  // 自动获取通知人员
  const recipients: Recipient[] = await getRecipientsForAlarm(
    ev.tbmId,
    ev.alarmType
  );

  console.log("recipients", recipients);


  // ⭐ 统一发送渠道
  await notifyAllChannels(msg, recipients);
}
