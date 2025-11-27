// src/core/eventbus/eventBus.ts
import { EventEmitter } from "events";

import type { AlarmEvent } from "@models/alarm-event.types";



/* ============================================================
 * 2. Validation
 * ============================================================ */

export function validateEvent(ev: AlarmEvent): string | null {
  if (!ev) return "event is null";

  if (!ev.topic) return "missing topic";
  if (!ev.alarmType) return "missing alarmType";
  if (!ev.tbmId) return "missing tbmId";
  if (!ev.timestamp) return "missing timestamp";
  if (!ev.severity) return "missing severity";

  // parameters 是可选的，但如果存在必须合法
  if (ev.parameters) {
    if (!Array.isArray(ev.parameters)) return "parameters should be array";
    for (const p of ev.parameters) {
      if (!p.code) return "parameter missing code";
      if (p.value === undefined || Number.isNaN(p.value)) return "parameter missing/invalid value";
      if (!p.severity) return "parameter missing severity";
    }
  }

  return null;
}

/* ============================================================
 * 3. Event Creator
 * ============================================================ */

export function createEvent(event: AlarmEvent): AlarmEvent {
  const now = new Date().toISOString();
  const ev: AlarmEvent = {
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
export function publishEvent(topic: string, event: AlarmEvent) {
  const full = createEvent(event);
  process.nextTick(() => bus.emit(`event:${topic}`, full));
}

/** 订阅事件 */
export function subscribeEvent(
  topic: string,
  handler: (ev: AlarmEvent) => void
) {
  bus.on(`event:${topic}`, handler);
}

/** 用于调试时打印所有事件 */
export function subscribeAll(handler: (topic: string, ev: AlarmEvent) => void) {
  bus.on("newListener", (eventName) => {
    // only subscribe if eventName matches event:*
    if (String(eventName).startsWith("event:")) {
      bus.on(eventName, (ev) => handler(String(eventName), ev));
    }
  });
}

export const eventBus = bus;

export default bus;
