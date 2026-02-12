// apps/backend/src/notify/wecom/wecomNotify.ts

import axios from "axios";
import { logger } from "../../../core/logger.js";

const DEFAULT_WEBHOOK = process.env.WECOM_WEBHOOK_URL!;

export type WecomMessageType = "text" | "markdown" | "news";

export interface WecomNewsItem {
  title: string;
  description?: string;
  url?: string;
  picurl?: string;
}

/**
 * 构建企业微信消息 payload
 */
function buildPayload(type: WecomMessageType, content: any) {
  switch (type) {
    case "text":
      return {
        msgtype: "text",
        text: { content },
      };

    case "markdown":
      return {
        msgtype: "markdown",
        markdown: { content },
      };

    case "news":
      return {
        msgtype: "news",
        news: {
          articles: content as WecomNewsItem[],
        },
      };

    default:
      throw new Error(`Unsupported WeCom message type: ${type}`);
  }
}

/**
 * 企业微信统一发送器（带重试）
 */
export async function sendWecomMessage(
  type: WecomMessageType,
  content: any,
  webhook: string = DEFAULT_WEBHOOK,
  retries = 3
) {
  const payload = buildPayload(type, content);

  // console.log("Wecom payload:",webhook, payload);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await axios.post(webhook, payload, {
        timeout: 5000,
      });

      logger.info(`📤 WeCom message sent (${type})`);
      return;
    } catch (err) {
      logger.error(`❌ WeCom send error (attempt ${attempt}/${retries}):`, err?.message || err);

      // 最后一次仍失败 → 结束
      if (attempt === retries) {
        logger.error("❌ WeCom send failed after retries");
        return;
      }

      // 指数退避等待时间
      const delay = Math.pow(2, attempt) * 300;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
