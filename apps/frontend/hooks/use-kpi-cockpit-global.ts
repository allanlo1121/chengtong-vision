import { useSupabaseRealtimeSWR } from "./useSupabaseRealtimeSWR";
import { fetchKpiCockpitGlobal } from "@/lib/domain/command-center/client.service";

export function useKpiCockpitGlobal() {
  return useSupabaseRealtimeSWR({
    key: ["kpi-cockpit-global"],

    fetcher: fetchKpiCockpitGlobal,

    realtime: [
      { schema: "proj", table: "tunnels" },
      { schema: "proj", table: "tunnel_status_timeline" },
      { schema: "tbm", table: "tbm_assignments" },
      { schema: "tbm", table: "tbm_phase_active" },
      { schema: "tbm", table: "tbm_connection_status" },
      { schema: "tbm", table: "tbm_daily_progress" },
    ],

    debounceMs: 300,
  });
}
