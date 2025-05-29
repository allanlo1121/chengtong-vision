// apps/backend/index.js
import express from "express";
import http from "http";
import { initMQTT } from "./mqttClient.js";
import { initWebSocket, broadcast } from "./websocket.js";


const app = express();
const PORT = 8080;
const server = http.createServer({ port: PORT, host: "0.0.0.0" }, app);

// 初始化 WebSocket
initWebSocket(server);

// MQTT订阅初始化
initMQTT(async (topic, payload) => {
 // console.log("MQTT Message:", topic, payload);

  const { tbmcode, timestamp } = payload;

  if (topic.startsWith("chengtong/realdata/")) {
   // console.log("save & broadcast MQTT Data:");
    broadcast({ topic, payload: { ...payload, timestamp } });
  }

});


app.get("/", (req, res) => res.send("Backend is running"));

app.listen(8080, () => {
  console.log(`Backend running on port ${8080}`);
  if (process.send) {
    process.send("ready");
  }
});