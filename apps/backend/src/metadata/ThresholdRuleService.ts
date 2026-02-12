import { supabase } from "../core/supabase/client.js";
import type { ThresholdRule } from "./ThresholdRule.types.js";
import { MetadataRegistry } from "./MetadataRegistry.js";
import { MetadataServiceBase } from "./MetaDataServiceBase.js";

/**
 * 规则缓存：
 * globalCache: param_code → rule_type → ThresholdRule[]
 * perTbmCache: tbmId → param_code → rule_type → ThresholdRule[]
 */

export class ThresholdRuleService extends MetadataServiceBase {
  // private static _instance: ThresholdRuleService;

  // static get instance() {
  //   if (!this._instance) {
  //     this._instance = new ThresholdRuleService();
  //   }
  //   return this._instance;
  // }

  // 全局规则缓存
  private globalCache = new Map<
    string, // param_code
    Map<string, ThresholdRule[]> // rule_type → list
  >();

  // TBM 覆盖规则缓存
  private perTbmCache = new Map<
    string, // tbmId
    Map<
      string, // param_code
      Map<string, ThresholdRule[]> // rule_type → list
    >
  >();

  async load(): Promise<void> {
    console.log("📥 Loading ThresholdRuleService...");

    await this.loadGlobalRules();

    this.lastRefreshed = Date.now();
    this.initialized = true;
  }

  // =============================================================
  // 载入全局规则
  // =============================================================
  private async loadGlobalRules() {
    console.log("📥 Loading global threshold rules...");

    const { data, error } = await supabase
      .from("tbm_threshold_rules")
      .select("*")
      .eq("is_active", true)
      .order("param_code")
      .order("level");

    if (error) throw error;

    this.globalCache.clear();

    for (const row of data) {
      const { param_code, rule_type } = row;

      if (!this.globalCache.has(param_code)) {
        this.globalCache.set(param_code, new Map());
      }
      const typeMap = this.globalCache.get(param_code)!;

      row.source = "global";

      if (!typeMap.has(rule_type)) {
        typeMap.set(rule_type, []);
      }
      typeMap.get(rule_type)!.push(row);
    }

    console.log(`✅ Global rules loaded: ${this.globalCache.size} params`);
  }

  // =============================================================
  // 载入 TBM override rules
  // =============================================================
  private async loadTbmRules(tbmId: string) {
    console.log(`📥 Loading TBM(${tbmId}) override rules...`);

    const { data, error } = await supabase
      .from("tbm_threshold_rules_per_tbm")
      .select("*")
      .eq("tbm_id", tbmId)
      .eq("is_active", true)
      .order("param_code")
      .order("level");

    if (error) throw error;

    const paramMap = new Map<string, Map<string, ThresholdRule[]>>();

    for (const row of data) {
      const { param_code, rule_type } = row;

      if (!paramMap.has(param_code)) {
        paramMap.set(param_code, new Map());
      }
      const typeMap = paramMap.get(param_code)!;

      row.source = "override";

      if (!typeMap.has(rule_type)) {
        typeMap.set(rule_type, []);
      }
      typeMap.get(rule_type)!.push(row);
    }

    this.perTbmCache.set(tbmId, paramMap);

    console.log(`📌 TBM(${tbmId}) override rules loaded: ${paramMap.size} params`);
  }

  // =============================================================
  // 获取单个参数的规则（TBM override > global）
  // =============================================================
  async getRules(tbmId: string | null, paramCode: string): Promise<Map<string, ThresholdRule[]>> {
    // TBM 层
    if (tbmId) {
      if (!this.perTbmCache.has(tbmId)) {
        await this.loadTbmRules(tbmId);
      }

      const tbmMap = this.perTbmCache.get(tbmId)!;

      if (tbmMap.has(paramCode)) {
        return tbmMap.get(paramCode)!;
      }
    }

    // Global fallback
    return this.globalCache.get(paramCode) ?? new Map();
  }

  // =============================================================
  // 判断某参数是否有规则（提高 TBMProcessor 性能）
  // =============================================================
  hasParam(paramCode: string, tbmId?: string): boolean {
    if (tbmId && this.perTbmCache.has(tbmId)) {
      const tbmMap = this.perTbmCache.get(tbmId)!;
      if (tbmMap.has(paramCode)) return true;
    }

    return this.globalCache.has(paramCode);
  }

  // =============================================================
  // 清除 TBM 缓存
  // =============================================================
  clearTbm(tbmId: string) {
    this.perTbmCache.delete(tbmId);
  }

  /**
   * 获取 TBM 全部规则（TBM override > global，且不做 ruleType 合并）
   */
  private async getMergedParamRules(tbmId: string) {
    // ❶ 确保 TBM 层规则已加载
    if (!this.perTbmCache.has(tbmId)) {
      await this.loadTbmRules(tbmId);
    }

    const tbmMap = this.perTbmCache.get(tbmId)!;

    // ❷ 深拷贝 TBM 层规则（作为最终结果基础）
    const merged = new Map<string, Map<string, ThresholdRule[]>>(
      Array.from(tbmMap.entries()).map(([p, r]) => [p, new Map(r)])
    );

    // ❸ 把 global 中 TBM 未覆盖的 paramCode 补进来
    for (const [paramCode, typeMap] of this.globalCache.entries()) {
      if (!merged.has(paramCode)) {
        merged.set(paramCode, new Map(typeMap));
      }
    }

    return merged;
  }

  // =============================================================
  // 获取 TBM 所有 rules（single + group）
  // =============================================================
  async getAllRulesForTbm(tbmId: string) {
    // console.log("getAllRulesForTbm", tbmId);

    const tbmMap = await this.getMergedParamRules(tbmId);

    //console.log("getAllRulesForTbm", tbmMap);

    if (tbmMap.size === 0) {
      return { singleRules: [], groupRules: [] };
    }

    // ❷ 获取 group metadata
    const groupMeta = MetadataRegistry.parameterGroups.getGroupsForTbm(tbmId);

    //console.log("getAllRulesForTbm,groupMeta",groupMeta);

    const singleRules = [];
    const groupRules = [];

    // ---------------------------
    // ❸ 遍历 TBM override rules
    // ---------------------------
    for (const [paramCode, typeMap] of tbmMap.entries()) {
      //console.log("getAllRulesForTbm,groupMeta", paramCode, typeMap);

      const isGroup = groupMeta.some((g) => g.group_code === paramCode);

      if (isGroup) {
        // group 参数
        for (const [ruleType, list] of typeMap.entries()) {
          const groupDef = groupMeta.find((g) => g.group_code === paramCode)!;
          groupRules.push({
            groupCode: paramCode,
            members: groupDef.members,
            ruleType,
            rules: list,
            is_alarm: list.some((r) => r.is_alarm),
          });
        }
      } else {
        // 单参数
        for (const [ruleType, list] of typeMap.entries()) {
          singleRules.push({
            paramCode,
            ruleType,
            rules: list,
            is_alarm: list.some((r) => r.is_alarm),
          });
        }
      }
    }
    return { singleRules, groupRules };
  }

  // ============================================================
  // 全局刷新（所有规则重载）
  // ============================================================
  async refreshAll() {
    this.globalCache.clear();
    this.perTbmCache.clear();
    await this.loadGlobalRules();
  }
}
