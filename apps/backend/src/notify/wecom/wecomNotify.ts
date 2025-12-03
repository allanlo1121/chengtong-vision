// src/notify/wecomNotify.ts
import axios from "axios";
import { logger } from "@core/logger.js";
import { EventType } from "@/core/eventbus/types";
import { alarmWecomGroupTemplate } from "@/notify/templates/alarmWecomTemple.js";

// 企业微信 Webhook
const WEBHOOK_URL = process.env.WECHAT_WEBHOOK_URL ||
  "";

export async function sendWecomMessage(topic: string, event: EventType) {
  logger.info("📩 Sending WeCom notification...", event.topic);

  


  let content = await alarmWecomGroupTemplate(event);
  console.log("content",content);
  console.log();
  
  
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
