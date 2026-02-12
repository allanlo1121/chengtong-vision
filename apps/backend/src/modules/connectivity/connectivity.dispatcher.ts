import { subscribeEvent } from "../..//core/eventbus/eventBus.js";

import { NotificationService } from "../..//core/notifier/NotificationService.js";

export class ConnectivityEventDispatcher {
  static mount() {
    // 离线
    subscribeEvent("connectivity/offline", async (ev) => {
      console.log("offline", ev);
      NotificationService.handle(ev);
    });

    // 在线
    subscribeEvent("connectivity/online", async (ev) => {
      console.log("online", ev);
      NotificationService.handle(ev);
    });
  }
}
