import { ReactNode, useEffect, useState } from "react";
import type { RealtimeEvent } from "@frontend/types/realtime/realtime-events";
import { EventEmitter } from "@frontend/core/event/EventEmitter";
import { RealtimeEventBusContext } from "@frontend/core/event/RealtimeEventBus";

/** ✅ 全局唯一 EventEmitter */
const emitter = new EventEmitter<RealtimeEvent>();

export function RealtimeEventBusProvider({ children }: { children: ReactNode }) {
  const [lastEvent, setLastEvent] = useState<RealtimeEvent>();

  useEffect(() => {
    return emitter.subscribe((event) => {
      setLastEvent(event);
    });
  }, []); // ✅ 绝对不要把 emitter 放依赖里

  const emit = (event: Omit<RealtimeEvent, "at">) => {
    emitter.emit({
      ...event,
      at: Date.now(),
    });
  };

  return (
    <RealtimeEventBusContext.Provider value={{ lastEvent, emit }}>
      {children}
    </RealtimeEventBusContext.Provider>
  );
}
