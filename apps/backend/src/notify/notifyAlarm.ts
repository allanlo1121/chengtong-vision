// // notify/notifyAlarm.ts
// //import { sendWecomMessage } from "./wecom/sendWecom";
// import { alarmStartTemplate } from "./templates/alarmStart";
// import { alarmUpdateTemplate } from "./templates/alarmUpdate";

// import { getParameterMetadata } from "@/cache/parameterMetadataCache";
// import { getTbmContext } from "@/cache/tbmContextCache";
// import { alarmWecomGroupTemplate } from "./templates/alarmGroupTemple";
// import { sendWecomText } from "@notify/wecom/wecomNotify.js";

// /* ------------------------------------------------------------------
//    通用 metadata 构造（参数名 / tbm 名称）
// -------------------------------------------------------------------*/
// async function buildMetadata(row: any) {
//     const paramMeta = getParameterMetadata(row.param_code);
//     const tbmMeta = await getTbmContext(row.tbm_id);

//     return {
//         project_name: tbmMeta?.project_name ?? "",
//         tunnel_name: tbmMeta?.tunnel_name ?? "",
//         param_name: paramMeta?.name ?? row.param_code,
//         param_group: paramMeta?.group_name ?? "",
//         sub_system: paramMeta?.subsystem_code ?? "",
//         tbm_name: tbmMeta?.tbm_name ?? row.tbm_id,
//         group_members: paramMeta?.group_members || [],
//     };
// }


// export async function notifyAlarm(event: any) {
//     let message = "";

//     console.log("event", event.type, event.param_code, event.rule_type, event.value, event.delta_value);

//     const metadata = await buildMetadata(event);



//     if (event.type.startsWith("group_")) {
//         console.log("event.group", event.param_code, event.rule_type, event.value, event.delta_value);

//         message = await alarmWecomGroupTemplate(event, metadata);

//         console.log("group message", message);

//         const res = await sendWecomText("markdown", message);

//         console.log("sendWecomText",res);
        


//         return;

//         // return notifyGroupAlarm(event);
//     }

//     console.log("event,noGroup", event.param_code, event.rule_type, event.value, event.delta_value);

//     switch (event.type) {


//         case "start":
//             console.log("event.type start", event.param_code);

//             message = alarmStartTemplate(event);
//             break;

//         case "update":
//             console.log("event.type update", event.param_code);
//             message = alarmUpdateTemplate(event);
//             break;

//         // case "end":
//         //     message = alarmEndTemplate(event);
//         //     break;

//         default:
//             console.warn("Unknown alarm type:", event.type);
//             return;
//     }

//     // 统一通知渠道
//     // await sendWecomMessage(message);
// }
