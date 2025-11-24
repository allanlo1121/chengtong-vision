import { normalizeTbmKey } from "../tbmKey.js";

// 仅从 topic 提取 tbmKey，忽略 payload
// 期望形如：chengtong/<heartbeat|realdata>/<tbmKey>(/...)
export const extractTbmKey = (topic = "", _payload = {}) => {
  if (!topic) return null;
  const parts = topic.split("/").filter(Boolean);
  if (parts.length >= 3) {
    return normalizeTbmKey(parts[2]);
  }
  return null;
};

export const extractRingNo = (payload = {}) => {
  if (!payload || typeof payload !== "object") return null;
  return (
    payload.s100100008 ??
    null
  );
};