// thresholds/thresholdCache.ts
import { supabase } from "@/core/supabase/client";
import type { ThresholdProfile } from "@models/tbm/threshold-types";


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
    rules: mergeRules(std.rules, ov.rules),
  };
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
  await Promise.all([
    loadStandardStatic(),
    loadStandardDelta(),
    loadOverrideStatic(),
    loadOverrideDelta(),
  ]);
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
      tbm_runtime_parameters(param_code)
    `)
    .eq("is_active", true);

  res.data?.forEach(row => {
    const code = row.tbm_runtime_parameters?.[0]?.param_code;
    if (!code) return;

    if (!standardThresholdCache.has(code)) {
      standardThresholdCache.set(code, {
        param_id: row.param_id,
        param_code: code,
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
      tbm_runtime_parameters(param_code)
    `)
    .eq("is_active", true);

  res.data?.forEach(row => {
    const code = row.tbm_runtime_parameters?.[0]?.param_code;
    if (!code) return;

    if (!standardThresholdCache.has(code)) {
      standardThresholdCache.set(code, {
        param_id: row.param_id,
        param_code: code,
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
      tbm_runtime_parameters(param_code)
    `);

  res.data?.forEach(row => {
    const tbmId = row.tbm_id;
    const code = row.tbm_runtime_parameters?.[0]?.param_code;
    if (!tbmId || !code) return;

    if (!tbmOverrideCache.has(tbmId)) {
      tbmOverrideCache.set(tbmId, new Map());
    }

    const map = tbmOverrideCache.get(tbmId)!;

    if (!map.has(code)) {
      map.set(code, { param_id: row.param_id, param_code: code, rules: [] });
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
      tbm_runtime_parameters(param_code)
    `);

  res.data?.forEach(row => {
    const tbmId = row.tbm_id;
    const code = row.tbm_runtime_parameters?.[0]?.param_code;
    if (!tbmId || !code) return;

    if (!tbmOverrideCache.has(tbmId)) {
      tbmOverrideCache.set(tbmId, new Map());
    }

    const map = tbmOverrideCache.get(tbmId)!;

    if (!map.has(code)) {
      map.set(code, { param_id: row.param_id, param_code: code, rules: [] });
    }

    map.get(code)!.rules.push({
      type: "delta",
      window_ms: row.window_ms,
      delta_warning_abs: row.delta_warning_abs,
      delta_critical_abs: row.delta_critical_abs,
    });
  });
}
