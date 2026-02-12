// apps/backend/src/services/ring/ringDispatcher.ts

import { subscribeEvent } from "../../core/eventbus/eventBus.js";
import { NotificationService } from "../../core/notifier/NotificationService.js";

export const RingDispatcher = {
  mount() {
    console.log("🔔 Mounting RingDispatcher...");

    // 正常递增
    subscribeEvent("ring/normal", async (ev) => {
      await NotificationService.handle(ev);
    });

    // 回退
    subscribeEvent("ring/rollback", async (ev) => {
      await NotificationService.handle(ev);
    });

    // 跳跃
    subscribeEvent("ring/jump", async (ev) => {
      await NotificationService.handle(ev);
    });

    // 复位
    subscribeEvent("ring/reset", async (ev) => {
      await NotificationService.handle(ev);
    });

    // 首次环号
    // subscribeEvent("ring/first", async (ev) => {
    //     await RingEventRepo.insert(ev.tbmId, "first", 0, ev.ring);
    // });

    console.log("✅ RingDispatcher mounted.");
  },
};
