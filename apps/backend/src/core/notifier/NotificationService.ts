// src/core/notifier/NotificationService.ts

import type { WrappedEvent } from "../../core/eventbus/eventBus.js";
import type { NotificationMessage } from "../eventbus/event.types.js";

// import { RecipientFinder } from "./RecipientFinder.js";
// import { ChannelSelector } from "./ChannelSelector.js";
// import { ChannelMap } from "./channels";
import { logger } from "../../core/logger.js"; // 可选
import { getRecipientsForAlarm } from "./recipientRepo.js";
import { MetadataRegistry } from "../../metadata/MetadataRegistry.js";
import { sendWecomMessage } from "./ChannelSender/WecomSender.js";
import { sendSmsNotify } from "./ChannelSender/SmsSender.js";
import { toPlainText } from "./utils/toPlainText.js";

export class NotificationService {
  /**
   * 处理任何事件的通知逻辑
   */
  static async handle(ev: WrappedEvent) {
    // console.log("handle ev", ev);

    try {
      const eventType = ev.type;
      const payload = ev.payload;

      const { tbmId, paramCode, severity } = payload;
      // console.log("notif payload", tbmId, paramCode, severity);

      const paramMeta = MetadataRegistry.parameterMetas.get(paramCode);

      // console.log("paramMeta", paramMeta);

      const alarmType = paramMeta?.subsystem_code ?? null;

      // ==========================================
      // 1) 检查是否有 notification 字段
      // ==========================================
      const notification: NotificationMessage | undefined = payload.notification;

      if (!notification) {
        logger?.warn?.(
          `[Notifier] Event "${eventType}" 没有 notification 字段，跳过通知。payload=`,
          payload
        );
        return;
      }

      //   // ==========================================
      //   // 2) 查找接收人（项目负责人 / 维护人员 / 值班组等）
      //   // ==========================================
      const recipients = await getRecipientsForAlarm(tbmId, alarmType);

      if (!recipients || recipients.length === 0) {
        logger?.warn?.(`[Notifier] 未找到消息接收人，事件 ${eventType} 通知将被忽略。`);
        return;
      }
      // console.log("recipients", recipients);

      const mobiles = recipients.map((r) => r.phone).filter(Boolean) as string[];
      console.log("mobiles", mobiles);

      //   // ==========================================
      //   // 3) 选择发送渠道（WeCom / SMS / Email）
      //   // ==========================================
      //   const channels = ChannelSelector.pick(ev);

      //   if (!channels || channels.length === 0) {
      //     logger?.warn?.(`[Notifier] 未选择任何通知渠道，事件 ${eventType} 通知将被忽略。`);
      //     return;
      //   }

      //   // ==========================================
      //   // 4) 打印通知日志
      //   // ==========================================
      //   logger?.info?.(
      //     `📨 [Notifier] 准备发送通知：事件=${eventType}, 渠道=${channels.join(", ")}, 接收人=${recipients.length}`
      //   );

      //   // ==========================================
      //   // 5) 发送消息到各渠道
      //   // ==========================================

      // const res = await sendWecomMessage("markdown", notification.content);

      // const res2 = await sendSmsNotify(
      //     notification.title,
      //     toPlainText(notification.content),
      //     mobiles
      // );

      //   for (const ch of channels) {
      //     const sender = ChannelMap[ch];

      //     if (!sender) {
      //       logger?.error?.(`[Notifier] 未找到渠道 "${ch}" 对应的 sender`);
      //       continue;
      //     }

      //     try {
      //       await sender.send(notification, recipients);
      //       logger?.info?.(`✔ [Notifier] 渠道 ${ch} 发送成功`);
      //     } catch (err) {
      //       logger?.error?.(
      //         `❌ [Notifier] 渠道 ${ch} 发送失败:`,
      //         err
      //       );
      //     }
      //   }
    } catch (err) {
      logger?.error?.(`❌ NotificationService.handle() 全局异常:`, err);
    }
  }
}
