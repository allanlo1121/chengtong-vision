import { supabase } from "../core/supabase/client.js";
import { MetadataServiceBase } from "./MetaDataServiceBase.js";

export interface GroupMetadata {
  group_code: string;
  group_name: string | null;
  members: string[];
  size: number;
}

export class ParameterGroupService extends MetadataServiceBase {
  /** 全局默认：group_code → members[] */
  private globalGroups = new Map<string, string[]>();

  /** 全局 group 基本信息：group_code → group_name */
  private groupNames = new Map<string, string>();

  /** per TBM 覆盖：tbm_id → group_code → members[] */
  private perTbmGroups = new Map<string, Map<string, string[]>>();

  // ============================================================
  // 主入口：加载全局组 + TBM 的覆盖数据
  // ============================================================
  async load(): Promise<void> {
    console.log("📥 Loading Parameter Groups...");

    await this.loadGlobalGroups();
    await this.loadGroupNames();

    // ⚠ per TBM 覆盖不在这里加载（按需加载）
    //   因为 TBM 非常多，不可能初始化时全部加载

    this.lastRefreshed = Date.now();
    this.initialized = true;

    console.log(`📌 ParameterGroupService initialized: ${this.globalGroups.size} global groups`);
  }

  // ============================================================
  // 加载 group 名称表（tbm_parameter_groups）
  // ============================================================
  private async loadGroupNames(): Promise<void> {
    const { data, error } = await supabase
      .from("tbm_runtime_parameters")
      .select("code, name")
      .eq("is_group", true);

    if (error) throw error;

    this.groupNames.clear();

    for (const row of data) {
      this.groupNames.set(row.code, row.name);
    }
  }

  // ============================================================
  // 加载全局默认 group 配置
  // ============================================================
  private async loadGlobalGroups(): Promise<void> {
    const { data, error } = await supabase
      .from("tbm_parameter_group_items")
      .select("group_code, member_code, sort_order")
      .order("sort_order");

    if (error) throw error;

    this.globalGroups.clear();

    for (const row of data) {
      if (!this.globalGroups.has(row.group_code)) {
        this.globalGroups.set(row.group_code, []);
      }
      this.globalGroups.get(row.group_code)!.push(row.member_code);
    }
  }

  // ============================================================
  // TBM override：按需加载
  // ============================================================
  async loadTbmGroups(tbmId: string): Promise<void> {
    const { data, error } = await supabase
      .from("tbm_parameter_group_items_per_tbm")
      .select("group_code, member_code, sort_order")
      .eq("tbm_id", tbmId)
      .order("sort_order");

    if (error) throw error;

    const tbmMap = new Map<string, string[]>();

    for (const row of data) {
      if (!tbmMap.has(row.group_code)) {
        tbmMap.set(row.group_code, []);
      }
      tbmMap.get(row.group_code)!.push(row.member_code);
    }

    this.perTbmGroups.set(tbmId, tbmMap);

    console.log(`📌 Loaded TBM(${tbmId}) group overrides: ${tbmMap.size} groups`);
  }

  // ============================================================
  // 获取 group 成员（优先 TBM override）
  // ============================================================
  getMembers(groupCode: string, tbmId?: string): string[] {
    // TBM override 优先
    if (tbmId && this.perTbmGroups.has(tbmId)) {
      const map = this.perTbmGroups.get(tbmId)!;
      if (map.has(groupCode)) return map.get(groupCode)!;
    }

    // 其次全局默认
    return this.globalGroups.get(groupCode) ?? [];
  }

  // ============================================================
  // 返回完整 metadata（包含名称 + members）
  // ============================================================
  getGroupMetadata(groupCode: string, tbmId?: string): GroupMetadata | null {
    const members = this.getMembers(groupCode, tbmId);
    if (!members.length) return null;

    const name = this.groupNames.get(groupCode) ?? null;

    return {
      group_code: groupCode,
      group_name: name,
      members,
      size: members.length,
    };
  }

  // ============================================================
  // 反向查找：某参数属于哪些 group
  // ============================================================
  getGroupsForParam(paramCode: string, tbmId?: string): string[] {
    const result: string[] = [];

    // TBM override（优先）
    if (tbmId && this.perTbmGroups.has(tbmId)) {
      for (const [group_code, members] of this.perTbmGroups.get(tbmId)!) {
        if (members.includes(paramCode)) result.push(group_code);
      }
    }

    // 全局默认
    for (const [group_code, members] of this.globalGroups) {
      if (members.includes(paramCode)) result.push(group_code);
    }

    return result;
  }

  /**
   * 获取某 TBM 的全部 group metadata（含名称、成员、数量）
   * 优先使用 TBM override，没有 override 则使用全局默认。
   */
  getGroupsForTbm(tbmId: string): GroupMetadata[] {
    const results: GroupMetadata[] = [];

    // ① TBM override 中的 group —— 优先
    const tbmMap = this.perTbmGroups.get(tbmId);
    if (tbmMap) {
      for (const [groupCode, members] of tbmMap.entries()) {
        const name = this.groupNames.get(groupCode) ?? null;
        results.push({
          group_code: groupCode,
          group_name: name,
          members: members.slice(), // 拷贝
          size: members.length,
        });
      }
    }

    // ② 全局 group —— TBM override 中已经存在的 group 不能重复
    for (const [groupCode, members] of this.globalGroups.entries()) {
      const alreadyIncluded = tbmMap?.has(groupCode) ?? false;
      if (alreadyIncluded) continue;

      const name = this.groupNames.get(groupCode) ?? null;
      results.push({
        group_code: groupCode,
        group_name: name,
        members: members.slice(),
        size: members.length,
      });
    }

    return results;
  }

  // ============================================================
  // 检查并按需刷新（覆写父类方法更清晰）
  // ============================================================
  async refreshIfNeeded(maxAgeMs: number): Promise<void> {
    const now = Date.now();
    if (now - this.lastRefreshed > maxAgeMs) {
      await this.load();
    }
  }
}
