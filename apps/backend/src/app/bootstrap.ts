// src/app/bootstrap.ts

import express from "express";
import { ENV } from "../config/env.js";
import { logger } from "../core/logger.js";

// Core
import { createMqttWrapper } from "../core/mqtt/mqttClient.js";
// Listeners
import { startRealtimeListeners } from "../listeners/supabaseRealtime.js";

import { TBMProcessor } from "../modules/realdata/TBMProcessor.js";

import { MetadataRegistry } from "../metadata/MetadataRegistry.js";
// import { DAQConnectivityWatcher } from "../modules/connectivity/DAQWatcher.js";
// import { ConnectivityEventDispatcher } from "../modules/connectivity/connectivity.dispatcher.js";
// import { RingService } from "../modules/ring/ring.service.js";
// import { RingDispatcher } from "../modules/ring/ringDispatcher.js";
// import { AlarmEventDispatcher } from "../modules/alarms/enents/alarm.dispatcher.js";

export async function bootstrap() {
  logger.info("🚀 Starting backend bootstrap...");

  await MetadataRegistry.parameterMetas.load();
  await MetadataRegistry.parameterGroups.load();
  await MetadataRegistry.thresholdRules.load();
  await MetadataRegistry.tbmValidator.preload();

  // DAQConnectivityWatcher.start();
  // ConnectivityEventDispatcher.mount();
  // await RingService.initFromDatabase();
  // RingDispatcher.mount();
  // AlarmEventDispatcher.mount();

  logger.info("✅ Metadata and Services initialized.");

  // ------------------ 3. 启动 Supabase Realtime 监听 ------------------
  startRealtimeListeners();
  logger.info("Supabase Realtime listeners running ✓");

  // ------------------ 4. 创建 Express App ------------------
  const app = express();
  app.use(express.json());

  // ------------------ 5. 启动 MQTT 客户端 ------------------
  const mqtt = createMqttWrapper({
    url: ENV.MQTT_BROKER_URL,
    options: {
      username: ENV.MQTT_USERNAME,
      password: ENV.MQTT_PASSWORD,
      clientId: ENV.MQTT_CLIENT_ID,
      clean: true,
    },
    autoSubscribe: ["chengtong/heartbeat/#", "chengtong/realdata/#"],
    hooks: {
      onConnect() {
        logger.info("MQTT Connected ✓");
      },
      onMessage({ topic, payload }) {
        if (topic.includes("realdata")) {
          TBMProcessor.handleRealdata(payload);
        }
      },
    },
  });

  // ------------------ 8. 启动 HTTP Server ------------------
  app.listen(ENV.PORT, () => {
    logger.info(`🚀 Server running on :${ENV.PORT}`);
  });
}
