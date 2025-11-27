

import { sendWecomText } from "./wecom/wecomNotify.js";
import { sendSmsNotification } from "./sms/smsNotifier.js";
import type { AlarmMessage } from "@models/alarm-event.types.js";
import type { Recipient } from "@models/notification/recipient.types";


export async function notifyAllChannels(msg: AlarmMessage, recipients: Recipient[]) {
    // 企业微信
    if (msg.wecomText) {
        await sendWecomText(msg.wecomText);
    }

    // 短信（确定有msg 和 电话号码）
    const mobiles = recipients
        .map(r => r.phone)
        .filter((m): m is string => typeof m === "string" && m.length > 0);

    if (msg.smsText && mobiles.length > 0) {
        await sendSmsNotification(mobiles, msg.smsText,);
    }


    //   // 邮件（当需要）
    //   if (msg.emailText) {
    //     await sendEmail(msg.emailText, msg.recipients);
    //   }
}
