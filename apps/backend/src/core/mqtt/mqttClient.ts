import mqtt, { MqttClient } from "mqtt";
import { logger } from "../logger.js";
import type { MqttClientConfig, MqttMessage, IMqttWrapper } from "./mqttTypes.js";

/**
 * 企业级 MQTT 客户端封装
 * - 自动连接
 * - 自动重连
 * - JSON 自动解析
 * - Promise-based subscribe/publish
 * - 多 Hook 支持
 */
export function createMqttWrapper(config: MqttClientConfig): IMqttWrapper {
  const { url, options, hooks = {}, autoSubscribe = [] } = config;

  logger.info("[MQTT] Connecting to:", url);

  const client: MqttClient = mqtt.connect(url, {
    reconnectPeriod: 2000,
    keepalive: 60,
    ...options,
  });

  // -----------------------------------------
  // Connect
  // -----------------------------------------
  client.on("connect", () => {
    logger.info("[MQTT] Connected");

    // Auto subscribe topics
    if (autoSubscribe.length > 0) {
      autoSubscribe.forEach((topic) => {
        client.subscribe(topic, (err) => {
          if (err) logger.error("[MQTT] Subscribe error:", err);
          else logger.info(`[MQTT] Subscribed: ${topic}`);
        });
      });
    }

    hooks.onConnect?.();
  });

  // -----------------------------------------
  // Reconnect & Error
  // -----------------------------------------
  client.on("reconnect", () => logger.info("[MQTT] Reconnecting..."));
  client.on("error", (err) => {
    logger.error("[MQTT] Error:", err);
    hooks.onError?.(err);
  });

  client.on("close", () => {
    logger.warn("[MQTT] Disconnected");
    hooks.onDisconnect?.();
  });

  // -----------------------------------------
  // Message Handler
  // -----------------------------------------
  client.on("message", (topic, raw) => {
    let parsed: any = raw;

    try {
      parsed = JSON.parse(raw.toString());
    } catch (err) {
      logger.warn("[MQTT] Received non-JSON message on topic:", topic);
      // keep raw buffer
    }

    const message: MqttMessage = {
      topic,
      payload: parsed,
      raw,
    };

    hooks.onMessage?.(message);
  });

  // -----------------------------------------
  // Promise-based wrapper
  // -----------------------------------------
  return {
    client,

    publish(topic: string, data: any, retain = false) {
      return new Promise<void>((resolve, reject) => {
        const message = typeof data === "object" ? JSON.stringify(data) : String(data);

        client.publish(topic, message, { retain }, (err) => (err ? reject(err) : resolve()));
      });
    },

    subscribe(topic: string | string[]) {
      return new Promise<void>((resolve, reject) => {
        client.subscribe(topic, (err) => (err ? reject(err) : resolve()));
      });
    },

    disconnect() {
      return new Promise<void>((resolve, reject) => {
        client.end(true, {}, (err?: Error) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
  };
}
