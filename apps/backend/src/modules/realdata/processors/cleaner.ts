// src/modules/realdata/processors/cleaner.ts

/**
 * RealdataCleaner
 * 用于：
 *  - 清洗无效值
 *  - 数值范围校验
 *  - 删除 null / undefined
 *  - 小数位保留处理
 *  - 去噪（可扩展）
 */

export const RealdataCleaner = {
  clean(data: Record<string, any>): Record<string, any> {
    const out: Record<string, any> = {};

    for (const [key, val] of Object.entries(data)) {
      if (val == null) continue; // 删除 undefined/null

      /* =============================
       * 1. 数值清洗（核心）
       * ============================= */
      if (typeof val === "number") {
        const cleaned = sanitizeNumber(val, key);
        out[key] = cleaned;
        continue;
      }

      /* =============================
       * 2. 布尔值不处理
       * ============================= */
      if (typeof val === "boolean") {
        out[key] = val;
        continue;
      }

      /* =============================
       * 3. 其他字段直接保留
       * ============================= */
      out[key] = val;
    }

    return out;
  },
};

/**
 * 对数值做基础清洗：
 *  - 去掉 NaN / Infinity
 *  - 限定范围（可换表驱动）
 *  - 统一保留 3 位小数
 */
function sanitizeNumber(v: number, key: string): number {
  if (!Number.isFinite(v)) return 0;

  let val = v;

  // 你可以针对某类参数做特别处理，如导向偏差范围
  if (key.startsWith("s100206")) {
    // 导向偏差范围建议 [-500, 500]
    if (val > 500) val = 500;
    if (val < -500) val = -500;
  }

  // 统一保留三位小数
  return Number(val.toFixed(3));
}
