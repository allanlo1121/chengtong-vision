import { useSupabaseRealtimeSWR } from "./useSupabaseRealtimeSWR";
import { TunnelRuntime } from "@/lib/domain/command-center/types";
import { fetchTunnelRuntime } from "@/lib/domain/command-center/server.service";

export function useTunnelRuntime() {
  return useSupabaseRealtimeSWR({
    key: ["tunnel-runtime"],

    fetcher: fetchTunnelRuntime,

    realtime: [
      { schema: "proj", table: "tunnels" },
      { schema: "proj", table: "tunnel_status_timeline" },
      { schema: "eqp", table: "tbm_assignments" },
    ],

    debounceMs: 300,
  });
}
