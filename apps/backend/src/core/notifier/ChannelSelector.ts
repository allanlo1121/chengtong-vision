// src/core/notifier/ChannelSelector.ts

import type { NotificationEvent, Channel } from "./types.js";

export class ChannelSelector {
  static pickChannels(ev: NotificationEvent): Channel[] {
    if (ev.eventType.startsWith("alarm")) {
      if (ev.severity === 3) return ["wechat", "sms"];
      if (ev.severity === 2) return ["wechat"];
      return ["wechat"];
    }

    if (ev.eventType.startsWith("connectivity")) {
      return ["wechat"];
    }

    return ["wechat"];
  }
}
