// /ui/hooks/useDebouncedEventEmitter.ts
import { useRef } from "react";
import type { RealtimeEvent } from "@frontend/types/realtime/realtime-events";

export function useDebouncedEventEmitter(
  emit: (event: Omit<RealtimeEvent, "at">) => void,
  delay = 300
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingRef = useRef<Omit<RealtimeEvent, "at"> | null>(null);

  const emitDebounced = (event: Omit<RealtimeEvent, "at">) => {
    pendingRef.current = event;

    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      if (pendingRef.current) {
        emit(pendingRef.current);
        pendingRef.current = null;
      }
      timerRef.current = null;
    }, delay);
  };

  return { emitDebounced };
}
