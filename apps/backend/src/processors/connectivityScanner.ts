// src/processing/connectivityScanner.ts
import { logger } from "../core/logger.js";
import { publishEvent } from "../core/eventbus/eventBus.js";
import {
  getActiveTbmIds,
} from "@/cache/tbmContextCache.js";

import {
  getConnectivitySnapshot,
  markHeartbeatOffline,
  markHeartbeatOnline,
  markPlcOffline,
  markPlcOnline,
} from "../domain/tbm/tbmConnectivityService.js";

export interface ConnectivityTimeoutConfig {
  heartbeatTimeoutMs: number; // 心跳多久没来算掉线
  plcTimeoutMs: number;       // 实时数据多久没来算掉线
}

const DEFAULT_TIMEOUT: ConnectivityTimeoutConfig = {
  heartbeatTimeoutMs: 60 * 1000, // 60 秒心跳超时
  plcTimeoutMs: 60 * 1000,       // 60 秒 PLC 数据超时
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
    const snap = await getConnectivitySnapshot(tbmId);
    if (!snap) continue;
    //console.log("snap", snap);

    // --- 检查心跳掉线 ---
    if (snap.last_heartbeat_at) {
      const ts = new Date(snap.last_heartbeat_at).getTime();

      const diff = now - ts;
      if (diff > config.heartbeatTimeoutMs && snap.heartbeat_status !== "offline") {

        logger.warn(`⚠ Heartbeat timeout: TBM ${tbmId} → OFFLINE`);

        publishEvent("ALARM", {
          topic: "ALARM",
          alarmType: "CONNECTIVITY",
          tbmId,
          paramCode: "n010000002",
          value: 0,
          severity: "critical",          
          timestamp: new Date().toISOString(),
          message: "采集盒子掉线，心跳信号丢失。",
          payload: snap
        });

        await markHeartbeatOffline(tbmId);
      }
      // --- 心跳恢复 ---
      else if (snap.heartbeat_status === "online" && snap.heartbeat_status === snap.last_heartbeat_status) {
        logger.info(`💚 Heartbeat recovered: TBM ${tbmId} back ONLINE`);

        publishEvent("ALARM", {
          topic: "ALARM",
          alarmType: "CONNECTIVITY",
          tbmId,
          paramCode: "n010000002",
          value: 1,
          severity: "info",          
          timestamp: new Date().toISOString(),
          message: "采集盒子心跳恢复。",
          payload: snap
        });

        await markHeartbeatOnline(tbmId);
      }
    }


    // --- 检查 PLC 掉线 ---
    if (snap.last_realdata_at) {
      const ts = new Date(snap.last_realdata_at).getTime();
      const diff = now - ts;

      if (diff > config.plcTimeoutMs && snap.plc_status !== "offline") {

        logger.warn(`⚠ PLC timeout: TBM ${tbmId} → OFFLINE`);
        publishEvent("ALARM", {
          topic: "ALARM",
          alarmType: "CONNECTIVITY",
          tbmId,
          paramCode: "n010000001",
          value: 0,
          severity: "critical",          
          timestamp: new Date().toISOString(),
          message: "采集程序掉线，数据采集丢失。",
          payload: snap
        });
        await markPlcOffline(tbmId);
      } else if (snap.last_plc_status === snap.plc_status && snap.plc_status === "online") {
        logger.info(`💚 PLC recovered: TBM ${tbmId} back ONLINE`);
        publishEvent("ALARM", {
          topic: "ALARM",
          alarmType: "CONNECTIVITY",
          tbmId,
          paramCode: "n010000002",
          value: 1,
          severity: "info",     
          timestamp: new Date().toISOString(),
          message: "采集程序已恢复，数据采集正常。",
          payload: snap
        });
        await markPlcOnline(tbmId);
      }
    }
  }
}

