// contexts/RealtimeEventBusContext.tsx
"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import type { RealtimeEvent } from "@frontend/types/realtime/realtime-events";
import { EventEmitter } from "./EventEmitter";

const emitter = new EventEmitter<RealtimeEvent>();

type RealtimeEventBusValue = {
  lastEvent?: RealtimeEvent;
  emit: (event: Omit<RealtimeEvent, "at">) => void;
};

export const RealtimeEventBusContext = createContext<RealtimeEventBusValue | null>(null);

export function useRealtimeEventBus() {
  const ctx = useContext(RealtimeEventBusContext);
  if (!ctx) {
    throw new Error("useRealtimeEventBus must be used inside provider");
  }
  return ctx;
}
