import { useSupabaseRealtimeSWR } from "./useSupabaseRealtimeSWR";
import { fetchTbmRuntimeState } from "@/lib/domain/command-center/client.service";

export function useTbmRuntimeState() {
  return useSupabaseRealtimeSWR({
    key: ["tbm-runtime"],

    fetcher: fetchTbmRuntimeState,

    realtime: [
      { schema: "tbm", table: "tbm_phase_active" },
      { schema: "tbm", table: "tbm_connection_status" },
    ],

    debounceMs: 300,
  });
}
