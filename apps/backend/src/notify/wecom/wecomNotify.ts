// src/notify/wecomNotify.ts
import axios from "axios";
import { logger } from "@core/logger.js";

// 企业微信 Webhook
const WEBHOOK_URL = process.env.WECHAT_WEBHOOK_URL ||
  "";

export async function sendWecomText(content: string) {
  try {
    const res = await axios.post(WEBHOOK_URL, {
      msgtype: "markdown",
      markdown: { content }
    });

    logger.info("📨 WeCom notification sent:", res.data);
  } catch (err) {
    logger.error("❌ WeCom send failed:", err);
  }
}
