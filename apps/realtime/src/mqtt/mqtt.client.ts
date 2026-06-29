import mqtt from "mqtt";
import "dotenv/config";
import os from "os";

import { io } from "../socket/socket.server";

import { updateRuntime } from "../runtime/runtime.store";

import { TbmRuntimeData } from "../runtime/runtime.types";
import { getTbmRuntimeContextByCode, persistRuntimeIfNeeded } from "../runtime/runtime.persistence";
import { processRuntimePhaseIfNeeded } from "../runtime/runtime.phase";
import { markConnectionOnline } from "../runtime/connection-online/mark-connection";
import { processRuntimeRingIfNeeded } from "../runtime/process-runtime-ring";

const hostname = os.hostname();

export const client = mqtt.connect(process.env.MQTT_URL!, {
  clientId: `realtime-server-${hostname}-${process.pid}`,

  username: process.env.MQTT_USERNAME,

  password: process.env.MQTT_PASSWORD,

  clean: true,

  reconnectPeriod: 5000,

  connectTimeout: 30_000,

  keepalive: 60,
});

client.on("connect", () => {
  console.log("mqtt connected");

  client.subscribe("chengtong/+/up/realdata");
  client.subscribe("chengtong/+/up/heartbeat");
});

client.on("message", async (topic, payload) => {
  console.log("Received MQTT message", { topic, payload: payload.toString() });
  try {
    const raw = JSON.parse(payload.toString());

    const parts = topic.split("/");
    const tbmCode = parts[1];
    const messageType = parts[3];

    // MQTT 原始字段映射
    const data: TbmRuntimeData = {
      tbmCode,

      recordedAt: Date.now(),

      values: { ...raw },
    };

    const context = await getTbmRuntimeContextByCode(tbmCode);

    if (!context?.tbmId) return;

    const recordedAt = new Date(data.recordedAt).toISOString();

    switch (messageType) {
      case "realdata": {
        updateRuntime(data);

        io.to(`tbm:${tbmCode}`).emit("runtime:update", data);

        await markConnectionOnline({
          type: "realdata",
          tbmId: context.tbmId,
          seenAt: recordedAt,
        });

        await persistRuntimeIfNeeded(data);
        await processRuntimePhaseIfNeeded(data);
        await processRuntimeRingIfNeeded({
          data,
          tbmId: context.tbmId,
        });

        //     await processRuntimeRingIfNeeded({
        //         data,
        //         tbmId: context.tbmId,
        //         tunnelId: context.tunnelId,
        // });

        break;
      }

      case "heartbeat": {
        await markConnectionOnline({
          type: "heartbeat",
          tbmId: context.tbmId,
          seenAt: recordedAt,
        });

        break;
      }

      default: {
        console.warn("Unsupported MQTT message type", {
          topic,
          messageType,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
});
