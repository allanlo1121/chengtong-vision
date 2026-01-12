// src/app/bootstrap.ts

import express from "express";
import { ENV } from "../config/env.js";
import { logger } from "../core/logger.js";

// Core
// import { createMqttWrapper } from "../core/mqtt/mqttClient.js";


// // Cache
// import { preloadAllTbmContextCache } from "../metadata/tbmContextCache.js";
// import { initParameterMetadata } from "@/metadata/parameterMetadataCache.js";
// import { loadAllThresholds } from "@/metadata/tbmThresoldCache.js"
// import { initSnapshotsForAllActiveTbms } from "../domain/tbm/tbmConnectivityService.js";
// import { AlarmEventDispatcher } from "@events/AlarmEventDispatcher.js";
// import { ParameterMetadataEngine } from "../metadata/ParameterMetadataEngine.js";
// import { AlarmEventRenderer } from "../core/alarm/renderer/AlarmEventRenderer.js";
// //import { startEventBus } from "./core/events/eventBus.js";
// import { startAlarmEngine } from "./alarm/AlarmEngine.js";

// export const metaEngine = new ParameterMetadataEngine();
// export let alarmRenderer: AlarmEventRenderer;

// // Listeners
// import { startRealtimeListeners } from "../listeners/supabaseRealtime.js";
// // import { initEventDispatcher } from "../events/eventDispatcher.js";

// // Processing
// import { startConnectivityScanner } from "../processors/connectivityScanner.js";
// import { handleHeartbeat } from "../processors/tbmConnectivityProcessor.js";
// import { handleRealdata } from "../processors/tbmRealtimeProcessor.js"

// import { startActiveStateListener } from "@/listeners/activeStateListener";


// Services
// import { initTbmAssignmentService } from "../domain/tbm/tbmAssignmentService.js";

import {
  parameterMetadataService,
  tbmContextService,
  thresholdProfileService
} from "@/metadata/index.js";

export async function bootstrap() {
  logger.info("🚀 Starting backend bootstrap...");


  await parameterMetadataService.load();
  await tbmContextService.load();
  await thresholdProfileService.load();

  console.log("🚀 Metadata services initialized.");


  // ------------------ 1. 预加载缓存 ------------------
  // await preloadAllTbmContextCache();
  // logger.info("Cache loaded ✓");

  // ------------------ 2. 初始化 TBM Assignment 服务 ------------------
  //   await initTbmAssignmentService();
  //   logger.info("TBM Assignment Service initialized ✓");

  // ------------------ 2. 初始化所有 TBM 的连接快照 ------------------
  //await initSnapshotsForAllActiveTbms()

  // await initParameterMetadata();

  // await loadAllThresholds();

  // // ① 加载参数元数据缓存
  // await metaEngine.load();
  // console.log("✅ [BOOT] 参数元数据已加载");

  // // ② 创建报警渲染器
  // alarmRenderer = new AlarmEventRenderer(metaEngine);
  // console.log("✅ [BOOT] 报警渲染器已就绪");

  // // ① 挂载报警事件派发器
  // AlarmEventDispatcher.mount();



  // startActiveStateListener();

  // ------------------ 3. 启动 Supabase Realtime 监听 ------------------
  // startRealtimeListeners();
  // logger.info("Supabase Realtime listeners running ✓");

  // ------------------ 4. 创建 Express App ------------------
  const app = express();
  app.use(express.json());

  // ------------------ 5. 启动 MQTT 客户端 ------------------
  // const mqtt = createMqttWrapper({
  //   url: ENV.MQTT_BROKER_URL,
  //   options: {
  //     username: ENV.MQTT_USERNAME,
  //     password: ENV.MQTT_PASSWORD,
  //     clientId: ENV.MQTT_CLIENT_ID,
  //     clean: true,
  //   },
  //   autoSubscribe: [
  //     "chengtong/heartbeat/#",
  //     "chengtong/realdata/#",
  //   ],
  //   hooks: {
  //     onConnect() {
  //       logger.info("MQTT Connected ✓");
  //     },
  //     onMessage({ topic, payload }) {
  //       if (topic.includes("heartbeat")) {
  //         handleHeartbeat(topic, payload);
  //       } else if (topic.includes("realdata")) {
  //         handleRealdata(topic, payload);
  //       }
  //     }
  //   }
  // });

  // ------------------ 6. 掉线扫描器 ------------------
  // startConnectivityScanner(10_000);
  // logger.info("Connectivity Scanner started ✓");

  // ------------------ 7. 初始化事件总线消费者 ------------------
  // initEventDispatcher();

  // ------------------ 8. 启动 HTTP Server ------------------
  app.listen(ENV.PORT, () => {
    logger.info(`🚀 Server running on :${ENV.PORT}`);
  });
}
