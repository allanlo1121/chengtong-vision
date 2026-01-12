// metadata/ThresholdProfileService.ts
import { supabase } from "@/core/supabase/client.js";
import { MetadataServiceBase } from "./MetaDataServiceBase";

export interface ThresholdRule {
    type: "static" | "delta";
    window_ms: number;
    warning_low: number | null;
    warning_high: number | null;
    critical_low: number | null;
    critical_high: number | null;
    step: number | null;
}

export interface ThresholdProfile {
    param_code: string;
    rules: ThresholdRule[];
}

export class ThresholdProfileService extends MetadataServiceBase {

    private profileMap = new Map<string, ThresholdProfile>();

    getByParam(paramCode: string) {
        return this.profileMap.get(paramCode);
    }

    getAll() {
        return this.profileMap;
    }

    async load() {
        console.log("📥 [Metadata] Loading Threshold Profiles...");

        const { data, error } = await supabase
            .from("tbm_parameter_thresholds")
            .select("*");

        if (error) throw error;

        this.profileMap.clear();

        (data || []).forEach(row => {
            const rule: ThresholdRule = {
                type: row.type,
                window_ms: row.window_ms,
                warning_low: row.warning_low,
                warning_high: row.warning_high,
                critical_low: row.critical_low,
                critical_high: row.critical_high,
                step: row.step,
            };

            if (!this.profileMap.has(row.param_code)) {
                this.profileMap.set(row.param_code, {
                    param_code: row.param_code,
                    rules: []
                });
            }

            this.profileMap.get(row.param_code)!.rules.push(rule);
        });

        this.lastRefreshed = Date.now();
        console.log(`✅ [Metadata] Threshold loaded: ${this.profileMap.size}`);
    }
}

export const thresholdProfileService = new ThresholdProfileService();
