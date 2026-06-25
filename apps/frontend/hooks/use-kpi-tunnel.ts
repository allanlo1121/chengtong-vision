import { useSupabaseRealtimeSWR } from "./useSupabaseRealtimeSWR";
import { fetchKpiTunnel } from "@/lib/domain/command-center/client.service";

export function useKpiTunnel() {
  return useSupabaseRealtimeSWR({
    key: ["kpi-tunnel"],

    fetcher: fetchKpiTunnel,

    realtime: [
      { schema: "proj", table: "tunnels" },
      { schema: "proj", table: "tunnel_status_timeline" },
      { schema: "tbm", table: "tbm_assignments" },
      { schema: "tbm", table: "tbm_phase_active" },
    ],

    debounceMs: 300,
  });
}
