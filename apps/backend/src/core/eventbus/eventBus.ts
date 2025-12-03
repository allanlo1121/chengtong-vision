// src/core/eventbus/eventBus.ts
import { EventEmitter } from "events";

import type { EventType } from "./types";




/* ============================================================
 * 2. Validation
 * ============================================================ */

export function validateEvent(ev: EventType): string | null {
  if (!ev) return "event is null";

  if (!ev.tbmId) return "missing tbmId";
  if (!ev.timestamp) return "missing timestamp";
  if (ev.severity === undefined || ev.severity === null)
    return "missing severity";


  return null;
}

/* ============================================================
 * 3. Event Creator
 * ============================================================ */

export function createEvent(event: EventType): EventType {
  const now = new Date().getTime();
  const ev: EventType = {
    ...event,
    timestamp: event.timestamp ?? now,
  };

  const err = validateEvent(ev);
  if (err) {
    throw new Error(`Invalid Event: ${err}`);
  }

  return ev;
}

/* ============================================================
 * 4. Event Bus (Singleton)
 * ============================================================ */

const bus = new EventEmitter();

/** 发布事件 */
export function publishEvent(topic: string, event: EventType) {
  const full = createEvent(event);
  process.nextTick(() => bus.emit(`event:${topic}`, full));
}

/** 订阅事件 */
export function subscribeEvent(
  topic: string,
  handler: (ev: EventType) => void
) {
  bus.on(`event:${topic}`, handler);
}

/** 用于调试时打印所有事件 */
export function subscribeAll(handler: (topic: string, ev: EventType) => void) {
  bus.on("newListener", (eventName) => {
    // only subscribe if eventName matches event:*
    if (String(eventName).startsWith("event:")) {
      bus.on(eventName, (ev) => handler(String(eventName), ev));
    }
  });
}

export const eventBus = bus;

export default bus;
