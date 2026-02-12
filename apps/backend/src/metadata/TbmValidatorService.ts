// services/TbmValidatorService.ts
import { supabase } from "../core/supabase/client.js";
import { logger } from "../core/logger.js";

interface TbmValidationMeta {
  tbmCode: string;
  active: boolean;
  monitorConnectivity: boolean;
  loadedAt: number;
}

export class TbmValidatorService {
  private readonly metaMap = new Map<string, TbmValidationMeta>();

  /** preload：系统启动调用 */
  async preload() {
    logger.info("[TbmValidator] preload start");
    const { data, error } = await supabase.from("v_tbm_validation_meta").select("*");

    if (error) throw error;

    const now = Date.now();

    let activeCount = 0;
    let monitorCount = 0;

    for (const row of data) {
      const active = row.allow_alarm_calc ?? false;
      const monitor = row.monitor_connectivity ?? false;

      if (active) activeCount++;
      if (monitor) monitorCount++;

      this.metaMap.set(row.tbm_code, {
        tbmCode: row.tbm_code,
        active,
        monitorConnectivity: monitor,
        loadedAt: now,
      });
    }
    logger.info(
      {
        total: data.length,
        activeCount,
        monitorCount,
      },
      "[TbmValidator] preload done"
    );
  }

  /** Level 1：是否合法 */
  isKnown(tbmCode: string): boolean {
    return this.metaMap.has(tbmCode);
  }

  /** Level 2：是否允许进入报警计算 */
  isActive(tbmCode: string): boolean {
    return this.metaMap.get(tbmCode)?.active ?? false;
  }

  /** Level 3：是否参与掉线监控 */
  shouldMonitorConnectivity(tbmCode: string): boolean {
    return this.metaMap.get(tbmCode)?.monitorConnectivity ?? false;
  }

  /** 查询原始 meta（调试 / 监控用） */
  getMeta(tbmCode: string): TbmValidationMeta | null {
    return this.metaMap.get(tbmCode) ?? null;
  }

  /** 用于 assignment 变化时刷新（可选） */
  updateMeta(tbmCode: string, patch: Partial<TbmValidationMeta>) {
    const old = this.metaMap.get(tbmCode);
    if (!old) return;

    this.metaMap.set(tbmCode, {
      ...old,
      ...patch,
      loadedAt: Date.now(),
    });
  }
}
