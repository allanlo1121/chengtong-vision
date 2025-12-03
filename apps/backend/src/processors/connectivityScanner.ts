// src/processing/connectivityScanner.ts
import { logger } from "../core/logger.js";
import { publishEvent } from "../core/eventbus/eventBus.js";
import {
  getActiveTbmIds,
} from "@/cache/tbmContextCache.js";

import { upsertSpecialAlarm } from "@/core/alarm/services/SystemAlarmService";

import { EventType } from "@/core/eventbus/types";

import {
  getConnectivitySnapshot,
  markHeartbeatOffline,
  markHeartbeatOnline,
  markPlcOffline,
  markPlcOnline,
  getAllConnectivitySnapshots,
} from "../domain/tbm/tbmConnectivityService.js";

export interface ConnectivityTimeoutConfig {
  heartbeatTimeoutMs: number; // 心跳多久没来算掉线
  plcTimeoutMs: number;       // 实时数据多久没来算掉线
}

const DEFAULT_TIMEOUT: ConnectivityTimeoutConfig = {
  heartbeatTimeoutMs: 3 * 60 * 1000, // 60 秒心跳超时
  plcTimeoutMs: 3 * 60 * 1000,       // 5 分钟 PLC 数据超时
};

let isRunning = false;

/**
 * 启动掉线检测循环
 */
export function startConnectivityScanner(
  scanIntervalMs = 10_000,
  config: ConnectivityTimeoutConfig = DEFAULT_TIMEOUT
) {
  if (isRunning) {
    logger.warn("⚠ connectivityScanner already running");
    return;
  }

  isRunning = true;

  logger.info(`🔌 connectivityScanner started (every ${scanIntervalMs} ms)`);

  setInterval(() => {
    scanAllTbms(config).catch((err) => {
      logger.error("❌ connectivityScanner loop error:", err);
    });
  }, scanIntervalMs);
}



/**
 * 扫描所有 active TBMs
 */
async function scanAllTbms(config: ConnectivityTimeoutConfig) {
  const tbmIds = getActiveTbmIds();
  if (!tbmIds.length) return;

  const now = Date.now();

  for (const tbmId of tbmIds) {
    //1. 检查心跳状态
    const snaps = await getAllConnectivitySnapshots(tbmId);
    if (!snaps) continue;
    //console.log("snap", snap);
    const heartbeat = snaps.heartbeat;
    const plc = snaps.plc;

    // --- 检查心跳掉线 ---
    if (heartbeat && heartbeat.updated_at) {
      const ts = new Date(heartbeat.updated_at).getTime();

      const diff = now - ts;
      if (diff > config.heartbeatTimeoutMs && heartbeat.status !== "OFFLINE") {
        logger.warn(`⚠ Heartbeat timeout: TBM ${tbmId} → OFFLINE`);

        await upsertSpecialAlarm(
          tbmId,
          "n010000002",
          2,     // 红色严重
          0,     // offline
          heartbeat   // payload
        );
        // ② 构造统一事件对象
        const event: EventType = {
          topic: "alarm/heartbeat",
          tbmId: tbmId,
          paramCode: "n010000002",
          ringNo: null,

          severity: 2,
          level: 0,

          value: 0,
          rule: null,
          payload: null,

          timestamp: Date.now(),

        };

        // ③ 发送事件（MQTT / EventBus / Kafka）
        publishEvent(event.topic, event);


        await markHeartbeatOffline(tbmId);
      }
    }

    //2. 检查plc状态


    if (plc && plc.updated_at) {
      const plcTs = new Date(plc.updated_at).getTime();
      const plcDiff = now - plcTs;

      if (plcDiff > config.plcTimeoutMs && plc.status !== "OFFLINE") {
        logger.warn(`⚠ PLC timeout: TBM ${tbmId} → OFFLINE`);
        await upsertSpecialAlarm(
          tbmId,
          "n010000001",
          2,     // 红色严重
          0,     // offline
          plc   // payload
        );
        // ② 构造统一事件对象
        const event: EventType = {
          topic: "alarm/plc",
          tbmId: tbmId,
          paramCode: "n010000001",
          ringNo: null,

          severity: 2,
          level: 0,

          value: 0,
          rule: null,
          payload: null,

          timestamp: Date.now(),

        };

        // ③ 发送事件（MQTT / EventBus / Kafka）
        publishEvent(event.topic, event);
        await markPlcOffline(tbmId);
      }
    }



  }
}


