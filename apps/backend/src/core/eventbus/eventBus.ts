// src/core/eventbus/eventBus.ts
import { EventEmitter } from "events";
import type { EventMap, EventPayload } from "./event.types.js";

/* ============================================================
 * WrappedEvent: 通知模块需要的统一事件结构
 * ============================================================ */
export interface WrappedEvent<T extends keyof EventMap = keyof EventMap> {
  type: T;
  payload: EventPayload<T>;
}

/* ============================================================
 * 自动补 timestamp（业务 payload 中 timestamp 为 string/number 均可）
 * ============================================================ */
function normalizeEvent<T extends keyof EventMap>(payload: EventPayload<T>): EventPayload<T> {
  return {
    ...payload,
    timestamp: payload.timestamp ?? Date.now(),
  };
}

/* ============================================================
 * Event Bus Singleton
 * ============================================================ */
const bus = new EventEmitter();

/* ============================================================
 * 发布事件（发布 WrappedEvent）
 * ============================================================ */
export function publishEvent<T extends keyof EventMap>(type: T, payload: EventPayload<T>) {
  const finalPayload = normalizeEvent(payload);

  const wrapped: WrappedEvent<T> = {
    type,
    payload: finalPayload,
  };

  console.log("📢 EVENT FIRED:", wrapped);

  // 下一 tick 触发，保证异步
  process.nextTick(() => bus.emit(`event:${type}`, wrapped));
}

/* ============================================================
 * 订阅事件（接收 WrappedEvent）
 * ============================================================ */
export function subscribeEvent<T extends keyof EventMap>(
  type: T,
  handler: (ev: WrappedEvent<T>) => void
) {
  const eventName = `event:${type}`;
  console.log(`📡 SUBSCRIBE → ${eventName}`);

  const wrappedHandler = (ev: WrappedEvent<T>) => {
    console.log(`📥 EVENT RECEIVED → ${eventName}`, ev);
    try {
      handler(ev);
    } catch (err) {
      console.error(`❌ Handler Error in ${eventName}:`, err);
    }
  };

  bus.on(eventName, wrappedHandler);
}

/* ============================================================
 * 调试：监听所有事件
 * ============================================================ */
export function subscribeAll(handler: (type: string, ev: WrappedEvent) => void) {
  bus.on("newListener", (eventName) => {
    if (eventName.toString().startsWith("event:")) {
      console.log(`📡 SUBSCRIBE ALL → ${eventName}`);
      bus.on(eventName, (ev) => handler(eventName.toString(), ev));
    }
  });
}

export const EventBus = bus;
export default bus;
