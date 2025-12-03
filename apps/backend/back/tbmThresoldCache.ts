// thresholds/thresholdCache.ts
import { supabase } from "@/core/supabase/client";
import type { ThresholdProfile } from "@/models/tbm/threshold.types";



// 一级缓存：标准值（所有 TBM 共用）
const standardThresholdCache = new Map<string, ThresholdProfile>();

// 二级缓存：TBM override
// Map<tbmId, Map<paramCode, ThresholdProfile>>
const tbmOverrideCache = new Map<string, Map<string, ThresholdProfile>>();


/* -----------------------------------------------
 *  获取阀值（自动合并 override）
 * ----------------------------------------------- */
export function getThresholdProfile(paramCode: string, tbmId?: string): ThresholdProfile | undefined {
    const std = standardThresholdCache.get(paramCode);
    if (!std) return undefined;

    if (!tbmId) return std;

    const tbmMap = tbmOverrideCache.get(tbmId);
    if (!tbmMap) return std;

    const ov = tbmMap.get(paramCode);
    if (!ov) return std;

    return {
        param_id: std.param_id,
        param_code: std.param_code,
        group_code: std.group_code,
        group_name: std.group_name,
        sub_system: std.sub_system,
        rules: mergeRules(std.rules, ov.rules),
    };
}

/* -----------------------------------------------
 * 根据tbmId 获取所有阀值
 *------------------------------------------------ */
export function getAllEffectiveThresholds(tbmId: string): Map<string, ThresholdProfile> {
    const result = new Map<string, ThresholdProfile>();

    // 1️⃣ 先放入标准阀值（所有 TBM 通用）
    standardThresholdCache.forEach((stdVal, paramCode) => {
        result.set(paramCode, stdVal);
    });

    // 2️⃣ 再把 TBM override 合并进去
    const ovMap = tbmOverrideCache.get(tbmId);
    if (ovMap) {
        ovMap.forEach((ov, code) => {
            const base = result.get(code);
            if (!base) {
                // override 有该参数，但标准值没有，也允许
                result.set(code, ov);
            } else {
                result.set(code, {
                    param_id: base.param_id,
                    param_code: code,
                    group_code: base.group_code,
                    group_name: base.group_name,
                    sub_system: base.sub_system,
                    rules: mergeRules(base.rules, ov.rules),
                });
            }
        });
    }

    return result;
}


/* -----------------------------------------------
 * 合并 override
 * ----------------------------------------------- */
function mergeRules(baseRules: any[], overrideRules: any[]) {
    const out = [...baseRules];

    for (const ov of overrideRules) {
        const idx = out.findIndex(r => r.type === ov.type);
        if (idx >= 0) {
            out[idx] = { ...out[idx], ...ov };
        } else {
            out.push(ov);
        }
    }

    return out;
}


/* -----------------------------------------------
 *  主加载函数（一次性加载全部阀值）
 * ----------------------------------------------- */
export async function loadAllThresholds() {
    console.log("📥 [Threshold] 开始加载所有阀值…");

    const [
        stdStaticCount,
        stdDeltaCount,
        ovStaticCount,
        ovDeltaCount,
    ] = await Promise.all([
        loadStandardStatic(),
        loadStandardDelta(),
        loadOverrideStatic(),
        loadOverrideDelta(),
    ]);

    console.log(
        `✅ [Threshold] 加载完成：` +
        `标准静态=${stdStaticCount}, ` +
        `标准动态=${stdDeltaCount}, ` +
        `TBM静态覆盖=${ovStaticCount}, ` +
        `TBM动态覆盖=${ovDeltaCount}`
    );

    console.log(`📦 [Threshold] 可用参数总数（标准）：${standardThresholdCache.size}`);
    console.log(`📦 [Threshold] 有覆盖的 TBM 数量：${tbmOverrideCache.size}`);
    console.log("✅ [Threshold] 阀值系统初始化成功！");
}


function getParamCode(row: any): string | undefined {
    const tp = row.tbm_runtime_parameters as { code: string } | null;
    return tp?.code;
}


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
/* -----------------------------------------------
   加载标准静态阀值 
----------------------------------------------- */
async function loadStandardStatic() {
    const res = await supabase
        .from("tbm_parameter_thresholds")
        .select(`
      param_id,
      baseline_lower,
      baseline_upper,
      alert_lower,
      alert_upper,
      alert_lower_lower,
      alert_upper_upper,
      use_absolute,
      tbm_runtime_parameters(code,group_code,group_name,sub_system)
    `)
        .eq("is_active", true);

    let count = 0;

    res.data?.forEach(row => {
        const code = getParamCode(row);
        if (!code) return;
        const group_code = getRuntimeParamField(row, "group_code") ?? null;
        const group_name = getRuntimeParamField(row, "group_name") ?? null;
        const sub_system = getRuntimeParamField(row, "sub_system") ?? null;
        count++;

        if (!standardThresholdCache.has(code)) {
            standardThresholdCache.set(code, {
                param_id: row.param_id,
                param_code: code,
                group_code,
                group_name,
                sub_system,
                rules: [],
            });
        }

        standardThresholdCache.get(code)!.rules.push({
            type: "static",
            warning_low: row.alert_lower,
            warning_high: row.alert_upper,
            critical_low: row.alert_lower_lower,
            critical_high: row.alert_upper_upper,
            use_absolute: row.use_absolute,
        });
    });
    return count;
}


/* -----------------------------------------------
   加载标准动态阀值
----------------------------------------------- */
async function loadStandardDelta() {
    const res = await supabase
        .from("tbm_parameter_delta_thresholds")
        .select(`
      param_id,
      window_ms,
      delta_warning_abs,
      delta_critical_abs,
      tbm_runtime_parameters(code,group_code,group_name,sub_system)
    `)
        .eq("is_active", true);

    let count = 0;

    res.data?.forEach(row => {
        const code = getParamCode(row);
        if (!code) return;
        const group_code = getRuntimeParamField(row, "group_code") ?? null;
        const group_name = getRuntimeParamField(row, "group_name") ?? null;
        const sub_system = getRuntimeParamField(row, "sub_system") ?? null;

        count++;

        if (!standardThresholdCache.has(code)) {
            standardThresholdCache.set(code, {
                param_id: row.param_id,
                param_code: code,
                group_code: group_code,
                group_name: group_name,
                sub_system: sub_system,
                rules: [],
            });
        }

        standardThresholdCache.get(code)!.rules.push({
            type: "delta",
            window_ms: row.window_ms,
            delta_warning_abs: row.delta_warning_abs,
            delta_critical_abs: row.delta_critical_abs,
        });
    });
    return count;
}


/* -----------------------------------------------
   加载 TBM override 静态阀值
----------------------------------------------- */
async function loadOverrideStatic() {
    const res = await supabase
        .from("tbm_threshold_overrides")
        .select(`
      tbm_id,
      param_id,
      alert_lower,
      alert_upper,
      alert_lower_lower,
      alert_upper_upper,
      use_absolute,
      tbm_runtime_parameters(code,group_code,group_name,sub_system)
    `);
    let count = 0
    res.data?.forEach(row => {
        const tbmId = row.tbm_id;
        const code = getRuntimeParamField(row, "code");
        const group_code = getRuntimeParamField(row, "group_code") ?? null;
        const group_name = getRuntimeParamField(row, "group_name") ?? null;
        const sub_system = getRuntimeParamField(row, "sub_system") ?? null;
        if (!tbmId || !code) return;

        count++;

        if (!tbmOverrideCache.has(tbmId)) {
            tbmOverrideCache.set(tbmId, new Map());
        }

        const map = tbmOverrideCache.get(tbmId)!;

        if (!map.has(code)) {
            map.set(code, {
                param_id: row.param_id,
                param_code: code,
                group_code: group_code,
                group_name: group_name,
                sub_system: sub_system,
                rules: []
            });
        }

        map.get(code)!.rules.push({
            type: "static",
            warning_low: row.alert_lower,
            warning_high: row.alert_upper,
            critical_low: row.alert_lower_lower,
            critical_high: row.alert_upper_upper,
            use_absolute: row.use_absolute,
        });
    });
    return count;
}


/* -----------------------------------------------
   加载 TBM override 动态阀值
----------------------------------------------- */
async function loadOverrideDelta() {
    const res = await supabase
        .from("tbm_delta_threshold_overrides")
        .select(`
      tbm_id,
      param_id,
      window_ms,
      delta_warning_abs,
      delta_critical_abs,
      tbm_runtime_parameters(code,group_code,group_name,sub_system)
    `);
    let count = 0
    res.data?.forEach(row => {
        const tbmId = row.tbm_id;
        const code = getParamCode(row);
        const group_code = getRuntimeParamField(row, "group_code") ?? null;
        const group_name = getRuntimeParamField(row, "group_name") ?? null;
        const sub_system = getRuntimeParamField(row, "sub_system") ?? null;

        if (!tbmId || !code) return;

        count++;

        if (!tbmOverrideCache.has(tbmId)) {
            tbmOverrideCache.set(tbmId, new Map());
        }

        const map = tbmOverrideCache.get(tbmId)!;

        if (!map.has(code)) {
            map.set(code, { param_id: row.param_id, param_code: code, group_code: group_code, group_name: group_name, sub_system: sub_system, rules: [] });
        }

        map.get(code)!.rules.push({
            type: "delta",
            window_ms: row.window_ms,
            delta_warning_abs: row.delta_warning_abs,
            delta_critical_abs: row.delta_critical_abs,
        });
    });
    return count;
}
