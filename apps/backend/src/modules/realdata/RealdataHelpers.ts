import { GroupMetadata } from "../../metadata/ParameterGroupService.js";

export const extractTbmKey = (value: any): string | null => {
  if (!value) return null;

  let str = String(value).trim();
  if (!str) return null;

  // 8-char short key (from field box)
  if (str.length === 8) {
    return str.toUpperCase();
  }

  // full UUID → slice first 8
  return str.slice(0, 8).toUpperCase();
};

export const isValidTbmKey = (value: any): boolean => {
  const key = extractTbmKey(value);
  return !!(key && /^[A-Z0-9]{8}$/.test(key));
};

export function extractTbmId(payload: any): string | null {
  if (!payload) return null;

  const tbmId = payload.tbm_id || payload.tbmId || payload["tbm-id"] || null;

  if (!tbmId) return null;

  // 简单校验 UUID 结构
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return uuidRegex.test(tbmId) ? tbmId : null;
}

export function extractTbmTimestamp(payload: any): string {
  if (!payload) return new Date().toISOString();

  // ① 优先使用 PLC 发送的 recorded_at
  if (payload.recorded_at) {
    return new Date(payload.recorded_at).toISOString();
  }

  // ② 再用 ts（一般是毫秒时间戳）
  if (payload.ts) {
    return new Date(payload.ts).toISOString();
  }

  // ③ 兜底用系统时间
  return new Date().toISOString();
}
export function extractTbmTimestampMs(payload: any): number {
  const now = Date.now();

  if (!payload) return now;

  // ① 优先使用 PLC/设备发送的 recorded_at（字符串或数字都兼容）
  if (payload.recorded_at) {
    const t = new Date(payload.recorded_at).getTime();
    return Number.isFinite(t) ? t : now;
  }

  // ② 再用 ts（一般是毫秒时间戳）
  if (payload.ts) {
    const t = Number(payload.ts); // 避免 ts 不是 number 的情况
    return Number.isFinite(t) ? t : now;
  }

  // ③ 兜底用当前时间
  return now;
}

// -----------------------------
// 提取 ring（盾构机环号）
// 一般来自 payload.s100100008
// -----------------------------
export function extractRing(payload: any): number | null {
  if (!payload) return null;

  const candidate = payload.s100100008 ?? payload.ring ?? payload.RING ?? null;

  if (candidate == null) return null;

  const num = Number(candidate);
  return Number.isFinite(num) ? num : null;
}

export function normalizePayload(raw: Record<string, any>): Record<string, number> {
  const ts = extractTbmTimestampMs(raw); // 毫秒
  const timestamp = extractTbmTimestamp(raw); // 毫秒/秒 OR ISO 转数字

  const normalized: Record<string, number> = {
    ts,
  };

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "number") {
      normalized[key] = value;
    } else if (typeof value === "boolean") {
      normalized[key] = value ? 1 : 0;
    }
  }

  return normalized;
}

export function getGroupMaxValue(group: GroupMetadata, payload: Record<string, number>) {
  let maxAbs = -Infinity;
  let maxValue: number | null = null;

  for (const code of group.members) {
    const v = payload[code];
    if (typeof v !== "number") continue;

    const abs = Math.abs(v);

    if (abs > maxAbs) {
      maxAbs = abs;
      maxValue = v; // ⭐ 返回原始值
    }
  }

  return maxValue;
}

export function getAllGroupMaxValues(groups: GroupMetadata[], payload: Record<string, number>) {
  const result = {};

  for (const g of groups) {
    result[g.group_code] = getGroupMaxValue(g, payload);
  }

  return result;
}
