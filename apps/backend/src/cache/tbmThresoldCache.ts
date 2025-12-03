// cache/tbmThresholdCache.ts
import { supabase } from "@/core/supabase/client";
import type { ThresholdProfile, ThresholdRule } from "@core/alarm/types/ThresholdRule";

/**
 * =======================================================
 * 阀值缓存系统（统一模式）
 * - window_ms = 0 → 静态阀值
 * - window_ms > 0 → 动态阀值（以窗口为基准）
 * =======================================================
 */

/** 全局标准阀值（所有 TBM 使用） */
const standardThresholdCache = new Map<string, ThresholdProfile>();

/** TBM Override 阀值：Map<TBM-ID, Map<paramCode, ThresholdProfile>> */
const tbmOverrideCache = new Map<string, Map<string, ThresholdProfile>>();

/* -------------------------------------------------------
 * 对外方法：获取某参数（含 override 合并）
 * ------------------------------------------------------- */
export function getThresholdProfile(
    paramCode: string,
    tbmId?: string
): ThresholdProfile | undefined {
    const base = standardThresholdCache.get(paramCode);
    if (!base) return undefined;

    if (!tbmId) return base;

    const tbmRules = tbmOverrideCache.get(tbmId);
    if (!tbmRules) return base;

    const override = tbmRules.get(paramCode);
    if (!override) return base;

    return {
        ...base,
        rules: mergeRules(base.rules, override.rules),
    };
}

/* -------------------------------------------------------
 * 对外方法：获取某 TBM 所有有效阀值（含 override）
 * ------------------------------------------------------- */
export function getAllEffectiveThresholds(tbmId: string) {
    const result = new Map<string, ThresholdProfile>();

    // ① 先放入标准值
    standardThresholdCache.forEach((v, code) => {
        result.set(code, v);
    });

    // ② 再合并 override
    const ovMap = tbmOverrideCache.get(tbmId);
    if (ovMap) {
        ovMap.forEach((ov, code) => {
            const base = result.get(code);
            if (!base) {
                result.set(code, ov);
            } else {
                result.set(code, {
                    ...base,
                    rules: mergeRules(base.rules, ov.rules),
                });
            }
        });
    }

    return result;
}

/* -------------------------------------------------------
 * 内部方法：rule 合并（按 window_ms 区分）
 * ------------------------------------------------------- */
function mergeRules(
    baseRules: ThresholdRule[],
    ovRules: ThresholdRule[]
): ThresholdRule[] {
    const merged = [...baseRules];

    for (const ov of ovRules) {
        const idx = merged.findIndex((r) => r.window_ms === ov.window_ms);

        if (idx >= 0) {
            merged[idx] = { ...merged[idx], ...ov }; // override 替换标准值
        } else {
            merged.push(ov); // 新 rule 直接加入
        }
    }

    return merged;
}

/* -------------------------------------------------------
 * 主加载函数（启动时调用一次）
 * ------------------------------------------------------- */
export async function loadAllThresholds() {
    console.log("📥 [Threshold] 开始加载所有阀值…");

    const [stdCount, ovCount] = await Promise.all([
        loadStandardThresholds(),
        loadOverrideThresholds(),
    ]);

    console.log(
        `✅ [Threshold] 加载完成：标准=${stdCount}, 覆盖=${ovCount}, 参数总数=${standardThresholdCache.size}`
    );
}

/* -------------------------------------------------------
 * 加载标准阀值（统一 static + dynamic）
 * ------------------------------------------------------- */
type RuntimeParamFields = {
    code: string;
    group_code: string;
    group_name: string;
    sub_system: string;
};

function getRuntimeParamField<T extends keyof RuntimeParamFields>(
    row: any,
    field: T
): RuntimeParamFields[T] | undefined {
    return row.tbm_runtime_parameters?.[field];
}

async function loadStandardThresholds() {
    const res = await supabase
        .from("tbm_parameter_thresholds")
        .select(`
      param_id,
      window_ms,
      alert_lower,
      alert_upper,
      alert_lower_lower,
      alert_upper_upper,
      use_absolute,
      step,
      tbm_runtime_parameters(code, sub_system)
    `)
        .eq("is_active", true);

    let count = 0;

    res.data?.forEach((row) => {

        const code = getRuntimeParamField(row, "code");
        if (!code) return;

        if (!standardThresholdCache.has(code)) {
            standardThresholdCache.set(code, {
                param_id: row.param_id,
                param_code: code,
                sub_system: getRuntimeParamField(row, "sub_system") ?? null,
                rules: [],
            });
        }

        const rules = standardThresholdCache.get(code)!.rules;

        rules.push({
            type: row.window_ms && row.window_ms > 0 ? "delta" : "static",
            window_ms: row.window_ms ?? 0,
            warning_low: row.alert_lower,
            warning_high: row.alert_upper,
            critical_low: row.alert_lower_lower,
            critical_high: row.alert_upper_upper,
            use_absolute: row.use_absolute,
            step: row.step ?? 10, // ⭐ 加回 step
        });

        count++;
    });

    return count;
}

/* -------------------------------------------------------
 * 加载 TBM override 阀值
 * ------------------------------------------------------- */
async function loadOverrideThresholds() {
    const res = await supabase
        .from("tbm_threshold_overrides")
        .select(`
      tbm_id,
      param_id,
      window_ms,
      alert_lower,
      alert_upper,
      alert_lower_lower,
      alert_upper_upper,
      use_absolute,
      step,
      tbm_runtime_parameters(code, group_code, group_name, sub_system)
    `);

    let count = 0;

    res.data?.forEach((row) => {
        const tbmId = row.tbm_id;
        const p = {
            code: getRuntimeParamField(row, "code"),
            group_code: getRuntimeParamField(row, "group_code"),
            group_name: getRuntimeParamField(row, "group_name"),
            sub_system: getRuntimeParamField(row, "sub_system") ?? null,
        };

        if (!tbmId || !p?.code) return;

        if (!tbmOverrideCache.has(tbmId)) {
            tbmOverrideCache.set(tbmId, new Map());
        }

        const map = tbmOverrideCache.get(tbmId)!;

        if (!map.has(p.code)) {
            map.set(p.code, {
                param_id: row.param_id,
                param_code: p.code,
                sub_system: p.sub_system,
                rules: [],
            });
        }

        map.get(p.code)!.rules.push({
            type: row.window_ms && row.window_ms > 0 ? "delta" : "static",
            window_ms: row.window_ms ?? 0,
            warning_low: row.alert_lower,
            warning_high: row.alert_upper,
            critical_low: row.alert_lower_lower,
            critical_high: row.alert_upper_upper,
            use_absolute: row.use_absolute,
            step: row.step ?? 10, // ⭐ 加回 step
        });

        count++;
    });

    return count;
}
