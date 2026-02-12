// src/core/notifier/MessageRenderer.ts

import type { NotificationEvent, NotificationMessage } from "./types.js";

export class MessageRenderer {
  static render(ev: NotificationEvent): NotificationMessage {
    const title = `TBM ${ev.tbmId} 事件：${ev.eventType}`;

    const content = [
      `### 事件类型：${ev.eventType}`,
      `> 级别：${ev.severity}`,
      ``,
      `#### 事件内容`,
      `\`\`\`json`,
      JSON.stringify(ev.payload, null, 2),
      `\`\`\``,
    ].join("\n");

    return { title, content };
  }
}
