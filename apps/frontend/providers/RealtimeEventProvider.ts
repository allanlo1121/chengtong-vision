"use client";

import { createClient } from "@frontend/lib/supabase/client";
import { useEffect } from "react";
import { useRealtimeEventBus } from "@frontend/core/event/RealtimeEventBus";
import { useDebouncedEventEmitter } from "./useDebouncedEventEmitter.ts";

export function SupabaseRealtimeBridge() {
  const supabase = createClient();
  const { emit } = useRealtimeEventBus();
  const { emitDebounced } = useDebouncedEventEmitter(emit, 300);

  useEffect(() => {
    const channel = supabase.channel("realtime-event-bus");

    channel.on("postgres_changes", { event: "*", schema: "public", table: "tunnels" }, () =>
      emitDebounced({
        type: "tunnels_changed",
        source: "supabase",
      })
    );

    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tbm_active_connectivity_snapshots",
      },
      () =>
        emitDebounced({
          type: "tbm_connectivity_changed",
          source: "supabase",
        })
    );

    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tbm_assignments",
      },
      () =>
        emitDebounced({
          type: "tbm_assignment_changed",
          source: "supabase",
        })
    );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
