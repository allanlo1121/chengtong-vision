//import { EventBus } from "@core/eventbus/eventBus.js";
import { subscribeEvent } from "@core/eventbus/eventBus.js";


import { sendWecomMessage } from "@notify/wecom/wecomNotify";
import { sendSmsNotify } from "@notify/sms/smsNotifier";

export class AlarmEventDispatcher {

    static mount() {

        // ① 首次报警
        subscribeEvent("alarm/start", async (next) => {

            await sendWecomMessage("start", next);
            await sendSmsNotify("start", next);
        });

        // ② 等级变化
        subscribeEvent("alarm/update", async (next) => {

            await sendWecomMessage("update", next);
            await sendSmsNotify("update", next);
        });

        // ③ 报警结束
        subscribeEvent("alarm/end", async (next) => {


            await sendWecomMessage("end", next);
            // await sendSmsNotify("end", next);
        });

        // ③ 心跳报警
        subscribeEvent("alarm/heartbeat", async (next) => {


            await sendWecomMessage("heartbeat", next);
            await sendSmsNotify("heartbeat", next);
        });

        // ③ plc报警
        subscribeEvent("alarm/plc", async (next) => {


            await sendWecomMessage("plc", next);
            await sendSmsNotify("plc", next);
        });
        // ③ 一般报警
        subscribeEvent("alarm/event", async (next) => {
            //console.log("alarm/event",next);
            

            // await sendWecomMessage("alarm", next);
            // await sendSmsNotify("alarm", next);
        });
    }
}
