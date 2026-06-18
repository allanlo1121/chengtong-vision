import { createClient } from "@/lib/infra/supabase/client";

import { StatPeriodConfig } from "../types";

let cache: StatPeriodConfig | null = null;
let promise: Promise<StatPeriodConfig> | null = null;

export function getStatPeriodConfig(): Promise<StatPeriodConfig> {
  if (cache) return Promise.resolve(cache);

  // console.log("getStatPeriodConfig called, cache:", cache, "promise:", promise);

  if (!promise) {
    promise = (async () => {
      // console.log("Loading stat period config from DB...");
      const supabase = createClient();

      const { data, error } = await supabase
        .schema("public")
        .from("stat_period_settings")
        .select("*")
        .single();

      // console.log("Loaded stat period config from DB:", data, "error:", error );

      cache = {
        week_start_dow: data?.week_start_dow ?? 6,
        month_start_day: data?.month_start_day ?? 26,
        day_cutoff_time: data?.day_cutoff_time ?? "19:00",
        timezone: data?.timezone ?? "Asia/Shanghai",
      };

      return cache;
    })();
  }

  return promise;
}
