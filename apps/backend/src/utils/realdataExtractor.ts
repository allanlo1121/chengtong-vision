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

  const tbmId =
    payload.tbm_id ||
    payload.tbmId ||
    payload["tbm-id"] ||
    null;

  if (!tbmId) return null;

  // 简单校验 UUID 结构
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

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

// -----------------------------
// 提取 ring（盾构机环号）
// 一般来自 payload.s100100008
// -----------------------------
export function extractRing(payload: any): number | null {
    if (!payload) return null;

    const candidate =
        payload.s100100008 ??
        payload.ring ??
        payload.RING ??
        null;

    if (candidate == null) return null;

    const num = Number(candidate);
    return Number.isFinite(num) ? num : null;
}