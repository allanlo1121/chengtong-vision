// -----------------------------------------------------
// TbmContextService.ts
// 继承 MetadataServiceBase 的 TBM 上下文缓存服务
// -----------------------------------------------------

import { MetadataServiceBase } from "./MetaDataServiceBase.js";
import { supabase } from "../core/supabase/client.js";
import { logger } from "../core/logger.js";
import type { Database } from "../core/supabase/supabase.types.js";

type TbmOverviewRow = Database["public"]["Views"]["v_tbm_assignments_overview"]["Row"];

export interface TbmContext extends TbmOverviewRow {
  _updated_at: number;
}

export class TbmContextService extends MetadataServiceBase {
  /** TBM → Context */
  private cache = new Map<string, TbmContext>();

  /** 正在工作的 TBM 列表 */
  private activeTbmIds = new Set<string>();

  /** 单位：5分钟 */
  private readonly TTL_MS = 5 * 60 * 1000;

  constructor() {
    super();
  }

  // -----------------------------------------------------
  // 实际加载（全量加载所有 TBM）
  // -----------------------------------------------------
  async load(): Promise<void> {
    logger.info("⏳ Loading TBM context from view...");

    const { data, error } = await supabase.from("v_tbm_assignments_overview").select("*");

    if (error) {
      logger.error("❌ Failed loading TBM context:", error);
      return;
    }

    this.cache.clear();

    const now = Date.now();

    data.forEach((row) => {
      const ctx: TbmContext = {
        ...row,
        _updated_at: now,
      };
      this.cache.set(row.tbm_id!, ctx);
    });

    this.rebuildActiveTbmIds();

    this.lastRefreshed = now;
    this.initialized = true;

    logger.info(`✅ Loaded TBM context for ${this.cache.size} TBMs`);
  }

  // -----------------------------------------------------
  // 刷新单台 TBM（Realtime 调用）
  // -----------------------------------------------------
  async refreshTbm(tbmId: string): Promise<void> {
    logger.debug(`🔄 Refresh TBM(${tbmId}) context...`);

    const { data, error } = await supabase
      .from("v_tbm_assignments_overview")
      .select("*")
      .eq("tbm_id", tbmId)
      .maybeSingle();

    if (error) {
      logger.error(`❌ Failed refresh TBM(${tbmId}):`, error);
      return;
    }

    if (!data) {
      logger.warn(`⚠ TBM(${tbmId}) not found — removing from cache`);
      this.cache.delete(tbmId);
      this.activeTbmIds.delete(tbmId);
      return;
    }

    const ctx: TbmContext = {
      ...data,
      _updated_at: Date.now(),
    };

    this.cache.set(tbmId, ctx);
    this.updateActiveTbmState(tbmId, ctx.tbm_operation_status || "WORKING");
  }

  // -----------------------------------------------------
  // 获取上下文（含 TTL 自动刷新）
  // -----------------------------------------------------
  async get(tbmId: string): Promise<TbmContext | null> {
    await this.initialize();

    const cached = this.cache.get(tbmId);
    const now = Date.now();

    // 未命中
    if (!cached) {
      await this.refreshTbm(tbmId);
      return this.cache.get(tbmId) || null;
    }

    // 过期自动刷新
    if (now - cached._updated_at > this.TTL_MS) {
      await this.refreshTbm(tbmId);
    }

    return this.cache.get(tbmId) || cached;
  }

  // -----------------------------------------------------
  // Internal helpers
  // -----------------------------------------------------

  private rebuildActiveTbmIds() {
    this.activeTbmIds = new Set(
      [...this.cache.values()]
        .filter((ctx) => ctx.tbm_operation_status === "WORKING")
        .map((ctx) => ctx.tbm_id)
        .filter((id): id is string => id !== null)
    );

    logger.info(`🔥 Active TBM rebuilt: ${this.activeTbmIds.size} units`);
  }

  private updateActiveTbmState(tbmId: string, status: string) {
    if (status === "WORKING") this.activeTbmIds.add(tbmId);
    else this.activeTbmIds.delete(tbmId);
  }

  // -----------------------------------------------------
  // 调试辅助
  // -----------------------------------------------------

  dumpAll(): TbmContext[] {
    return [...this.cache.values()];
  }

  getActiveTbmIds(): string[] {
    return [...this.activeTbmIds];
  }

  isActive(tbmId: string): boolean {
    return this.activeTbmIds.has(tbmId);
  }
}

// 单例导出（全系统唯一）
export const tbmContextService = new TbmContextService();
