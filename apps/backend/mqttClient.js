// mqttClient.js
import mqtt from "mqtt";

const options = {
  host: "132.232.160.223",
  port: 1883,
  username: "tbm_listener6",
  password: "tbm_listener6",
  clientId: "backend-receiver6",
  clean: true,
};

let client = null;

const handleMessage = (topic, message, messageHandler) => {
  const raw = message.toString();
  //console.log("[MQTT] received", topic);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (err) {
    console.warn(`🚫 Ignored non-JSON message on topic '${topic}':`, raw);
    return;
  }

  try {
    messageHandler(topic, payload);
  } catch (err) {
    console.error("[MQTT] message handler failed:", err);
  }
};

// 初始化 MQTT 客户端
export const initMQTT = (messageHandler) => {
  if (client) {
    console.log("[MQTT] initMQTT called again; reusing existing client");
    client.removeAllListeners("message");
    client.on("message", (topic, message) => handleMessage(topic, message, messageHandler));
    return client;
  }

  console.log("[MQTT] initMQTT creating client", { ...options, password: "***" });
  client = mqtt.connect(options);

  const logConnect = (connAck = {}) => {
    console.log("✅ MQTT connected", {
      sessionPresent: !!connAck.sessionPresent,
      returnCode: connAck.returnCode ?? connAck.reasonCode ?? null,
    });
    client.subscribe(["chengtong/heartbeat/#", "chengtong/realdata/#"], (err) => {
      if (!err) console.log("[MQTT] subscribed to chengtong topics");
      else console.error("[MQTT] subscription error:", err);
    });
  };

  client.on("connect", logConnect);
  client.on("reconnect", () => console.log("[MQTT] reconnecting…"));
  client.on("close", () => console.log("[MQTT] connection closed"));
  client.on("offline", () => console.log("[MQTT] went offline"));
  client.on("end", () => console.log("[MQTT] connection ended"));
  client.on("error", (err) => console.error("[MQTT] error:", err?.message || err));

  client.on("message", (topic, message) => handleMessage(topic, message, messageHandler));

  if (client.connected) {
    logConnect();
  }

  return client;
};
