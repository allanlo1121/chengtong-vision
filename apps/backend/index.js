// apps/backend/index.js
import express from 'express';
import http from 'http';
import cron from 'node-cron';
import { initMQTT } from './mqttClient.js';
import { initWebSocket, broadcast } from './websocket.js';
import { saveData, saveDeviceStatus, markOfflineDevices } from './db.js';

const app = express();
const server = http.createServer(app);

// 初始化 WebSocket
initWebSocket(server);

// MQTT订阅初始化
initMQTT(async (topic, payload) => {
  console.log('MQTT Message:', topic, payload);

  const {proj_id, tbmcode,isOnline,timestamp} = payload;

  // const timestamp = payload.ts
  //   ? new Date(typeof payload.ts === 'number' ? payload.ts : Date.parse(payload.ts))
  //   : new Date();

  if (topic.startsWith('chengtong/status/')) {
    await saveDeviceStatus({
      proj_id,
      tbmcode,
      isOnline,
      timestamp,
    });
   
  } else if (topic.startsWith('chengtong/data/')) {
    await saveData(topic, { ...payload, timestamp });
    broadcast({ topic, payload: { ...payload, timestamp } });
  }
});

// 每分钟检查一次，标记90秒内无心跳设备为掉线
cron.schedule('* * * * *', async () => {
  try {
    await markOfflineDevices();
  } catch (error) {
    console.error('Error marking offline devices:', error);
  }
});

server.listen(8080, () => {
  console.log('Backend server listening on port 8080');
});
