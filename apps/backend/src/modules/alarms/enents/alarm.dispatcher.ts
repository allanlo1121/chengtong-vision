import { subscribeEvent } from "../../../core/eventbus/eventBus.js";
import { NotificationService } from "../../../core/notifier/NotificationService.js";

export class AlarmEventDispatcher {
  static mount() {
    // 离线
    subscribeEvent("alarm/start", async (ev) => {
      console.log("alarm/start", ev.payload.tbmId, ev.payload.paramCode, ev.payload.value);
      NotificationService.handle(ev);
    });

    // 在线
    subscribeEvent("alarm/update", async (ev) => {
      console.log("alarm/update", ev.payload.tbmId, ev.payload.paramCode, ev.payload.value);
      NotificationService.handle(ev);
    });
  }
}
