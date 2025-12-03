// ----------------------------
// TBM Context Cache
// ----------------------------
// 用途：缓存 TBM → 隧道 → 项目 → 负责人的上下文信息
// 来源表：v_tbm_assignments_overview
// 刷新策略：TTL + 主动刷新（Realtime）
// ----------------------------

// ----------------------------------------------
// TBM Context Cache (TypeScript Edition)
// ----------------------------------------------

import { supabase } from "../core/supabase/client.js";
import { logger } from "../core/logger.js";
import type { Database } from "@core/supabase/supabase.types.js";

// 从数据库 types 自动推导视图结构
type TbmOverviewRow =
    Database["public"]["Views"]["v_tbm_assignments_overview"]["Row"];

// 添加缓存内部字段
export interface TbmContext extends TbmOverviewRow {
    _updated_at: number;
}

// 缓存：tbm_id → 上下文对象
const tbmContextCache = new Map<string, TbmContext>();

// 默认 5 分钟 TTL
const TTL_MS = 5 * 60 * 1000;

let activeTbmIds: Set<string> = new Set();

// -----------------------------------------------------
//  刷新单台 TBM 的上下文
// -----------------------------------------------------
export async function refreshTbmContext(tbmId: string): Promise<void> {
    try {
        logger.debug(`🔄 [Cache] Refresh TBM context: ${tbmId}`);

        const { data, error } = await supabase
            .from("v_tbm_assignments_overview")
            .select("*")
            .eq("tbm_id", tbmId)
            .maybeSingle();

        if (error) {
            logger.error("❌ Failed to refresh TBM context:", error);
            return;
        }

        if (!data) {
            logger.warn(`⚠ TBM context missing for tbm_id=${tbmId}, deleting cache.`);
            tbmContextCache.delete(tbmId);
            activeTbmIds.delete(tbmId);
            return;
        }

        const ctx: TbmContext = {
            ...data,
            _updated_at: Date.now(),
        };

        tbmContextCache.set(tbmId, ctx);

        // ⭐ 更新 active TBM 状态
        updateActiveTbmState(tbmId, ctx.tbm_operation_status || "WORKING");

        logger.debug(`✅ [Cache] TBM(${tbmId}) context updated`);
    } catch (err) {
        logger.error("❌ Exception in refreshTbmContext:", err);
    }
}

// -----------------------------------------------------
//  获取 TBM Context（过期自动刷新）
// -----------------------------------------------------
export async function getTbmContext(
    tbmId: string
): Promise<TbmContext | null> {
    const cached = tbmContextCache.get(tbmId);

    if (cached && Date.now() - cached._updated_at < TTL_MS) {
        return cached;
    }

    await refreshTbmContext(tbmId);
    return tbmContextCache.get(tbmId) || null;
}

// 获取工作的tbm_id列表
function rebuildActiveTbmIds() {
    activeTbmIds = new Set(
        Array.from(tbmContextCache.values())
            .filter(ctx => ctx.tbm_operation_status === "WORKING")
            .map(ctx => ctx.tbm_id)
            .filter((id): id is string => id !== null)
    );

    logger.info(`🔥 Active TBM rebuilt: ${activeTbmIds.size} units`);
}

// 更新单台 TBM 的工作状态
function updateActiveTbmState(tbmId: string, status: string) {
    if (status === "WORKING") {
        activeTbmIds.add(tbmId);
    } else {
        activeTbmIds.delete(tbmId);
    }
}

// -----------------------------------------------------
//  启动时加载所有 TBM 的上下文
// -----------------------------------------------------
export async function preloadAllTbmContextCache(): Promise<void> {
    logger.info("⏳ [Cache] Loading TBM context cache...");

    const { data, error } = await supabase
        .from("v_tbm_assignments_overview")
        .select("*");

    if (error) {
        logger.error("❌ Failed to load TBM context cache:", error);
        return;
    }

    data.forEach((row: TbmOverviewRow) => {
        const ctx: TbmContext = {
            ...row,
            _updated_at: Date.now(),
        };
        tbmContextCache.set(row.tbm_id!, ctx);
    });

    rebuildActiveTbmIds();

    logger.info(`✅ [Cache] Loaded TBM context for ${tbmContextCache.size} TBMs`);
}

// -----------------------------------------------------
//  Realtime 批量刷新
// -----------------------------------------------------
export async function refreshMultipleTbmContext(
    tbmIds: string[]
): Promise<void> {
    for (const tbmId of tbmIds) {
        await refreshTbmContext(tbmId);
    }
}

// -----------------------------------------------------
// （可选）调试用：导出全部缓存
// -----------------------------------------------------
export function dumpTbmContextCache(): TbmContext[] {
    return [...tbmContextCache.values()];
}

export function getActiveTbmIds() {
    return Array.from(activeTbmIds);
}

export function isTbmActive(tbmId: string): boolean {
  return activeTbmIds.has(tbmId);
}

export function assertTbmActive(tbmId: string): void {
  if (!isTbmActive(tbmId)) {
    throw new Error(`TBM ${tbmId} is not active`);
  }
}
