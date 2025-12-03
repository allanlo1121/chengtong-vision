
// import type { AlarmEvent, EventUpdateType } from "@core/eventbus/types";
// import { getTbmContext } from "@/cache/tbmContextCache";
// import { getParameterMetadata } from "@cache/parameterMetadataCache.js";
// import { getRecipientsForAlarm } from "@domain/tbm/alarmNotificationService.js";
// import { wecomTemplates } from "./templates/wecomMessage.js";
// import { sendWecomText } from "@notify/wecom/wecomNotify.js";
// import { smsTemplates } from "./templates/smsMessage.js";
// import { sendSmsNotification } from "@notify/sms/smsNotifier.js";

// import type { TbmContext } from "@models/tbm/tbm-content.types.js";
// import type { ParameterMetadata } from "@models/tbm/realdata.types.js";

// export async function notifyAlarm(ev: AlarmEvent, updateType: EventUpdateType) {

//     //console.log("notifyAlarm updateType",ev, updateType);
//     // ① 是否需要通知？
//     if (!shouldNotify(updateType)) return;

//     const { tbmId, paramCode, value, duration_ms = 0 } = ev;
//     if (!tbmId || !paramCode) return;

//     const ctx: TbmContext | null = await getTbmContext(ev.tbmId);
//     if (!ctx) return;
//     const paramMeta: ParameterMetadata | undefined = getParameterMetadata(paramCode);
//     if (!paramMeta) return;

//     const alarmType = paramMeta.subsystem_code ?? 's10';

//     // ② 找到收件人
//     const recipients = await getRecipientsForAlarm(tbmId, alarmType);


    // console.log("Notify Alarm:");

    // console.log("  Project Name:", ctx?.project_short_name ?? tbmId);
    // console.log("  Tunnel Name:", ctx?.tunnel_name ?? "N/A");
    // console.log("  TBM:", ctx?.tbm_name ?? tbmId);
    // console.log("  Alarm Type:", alarmType);
    // console.log("  Parameter:", paramMeta ? `${paramMeta.name} (${paramMeta.code})` : paramCode);
    // console.log("  Severity:", ev.severity);
    // console.log("  Value:", value);
    // console.log("  Update Type:", updateType);
    // console.log("  Timestamp:", ev.timestamp);
    // console.log("  Duration (ms):", ev.duration_ms ?? "N/A");
    // console.log("  Recipients:", recipients.map(r => r.name).join(", ") || "None");

    // const tunnelObj = {
    //     projectName: ctx?.project_short_name ?? ctx?.project_name ?? "N/A",
    //     tunnel_name: ctx?.tunnel_name ?? "N/A",
    //     tbmName: ctx?.tbm_name ?? tbmId,
    // }

    // const paramName = paramMeta ? `${paramMeta.name} ` : paramCode;

    // const message = await wecomTemplates(ctx, ev, paramMeta, updateType);

    // //console.log(message);

    // await sendWecomText("markdown", message);

    // const mobiles = recipients
    //     .map(r => r.phone)
    //     .filter(Boolean) as string[];
    // if (mobiles.length > 0) {
    //     const messageSms = await smsTemplates(ctx, ev, paramMeta, updateType);
    //     // 发送短信
    //     // await sendSmsNotification(mobiles, messageSms);
    //     //console.log("SMS Message:");
    //     //console.log(messageSms);
    //     const res = await sendSmsNotification(mobiles, messageSms);
    //     //console.log("SMS Send Result:", res);
    // }

    // ④ 多渠道发送
    // await Promise.all([
    //     sendWeCom(message, recipients),
    //     sendSMS(message, recipients),
    //     sendEmail(message, recipients),
    //     // sendAppPush(message, recipients)
    // ]);




    // ③ 格式化消息
    // const message = await wecomTemplates(ev, ctx, paramMeta, updateType);


    // ② 找到收件人
    // const recipients = await resolveRecipients(ev.tbmId, ev.alarmType);
    // if (!recipients.length) return;c

    // // ④ 多渠道发送
    // await Promise.all([
    //     sendWeCom(message, recipients),
    //     sendSMS(message, recipients),
    //     sendEmail(message, recipients),
    //     // sendAppPush(message, recipients)
    // ]);

    // // ⑤ 记录通知日志
    // await writeAlarmNotificationLog(ev, updateType, recipients, message);
// }


// function shouldNotify(updateType: EventUpdateType) {
//     switch (updateType) {
//         case "new_event":
//         case "upgraded":
//         case "interval_refresh":
//         case "resolved":
//             return true;

//         case "value_changed":
//             return true;

//         case "downgraded":
//             return true;

//         case "no_change":
//             return false;

//         default:
//             return false;
//     }
// }
