import express from "express";
import dotenv from "dotenv";

import {
  refreshTbmMetadata,
  refreshParameterMetadata,
  startTunnelsRealtimeSubscription,
  startParameterRealtimeSubscription,
  getAllTbmMetadata,
  getTbmKey,
  getTbmIds,
  getTbmMetadata,
} from "./datastore/metadataStore.js";
import * as thresholdService from "./services/thresholdService.js";
import * as deltaThresholdService from "./services/deltaThresholdService.js";
import { initMQTT } from "./mqttClient.js";

import adminRouter from "./routes/admin.js";
// import initGuidanceAlertHandler from "./handlers/guidanceAlertHandler.js";
import initTbmConnectivityHandler from "./handlers/tbmConnectivityHandler.js";
import initTbmRealdataHandler from "./handlers/tbmRealdataHandler.js";
import {
  registerHeartbeat as registerHeartbeatConnectivity,
  registerRealdata as registerRealdataConnectivity,
} from "./services/tbmConnectivityService.js";
import initTbmConnectivityTracking from "./bootstrap/initTbmConnectivity.js";

import { extractTbmKey } from "./utils/parameters/handle.js";
import { handleRealdataThreshold } from "./processing/tbmRealdataProcessor.js";
import { normalizeTbmKey } from "./utils/tbmKey.js";
import initTbmGuidanceDataHandler from "./handlers/tbmGuidanceDataHandler.js";



dotenv.config();

const PORT = Number(process.env.PORT) || 8096;


const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/admin", adminRouter);




const handleHeartbeatMessage = (topic, payload) => {
  const rawKey = extractTbmKey(topic, payload);
  const canonicalKey = normalizeTbmKey(rawKey);
  if (!canonicalKey) {
    console.warn("[MQTT] Heartbeat payload missing tbmKey", { topic, payload });
    return;
  }

  const resolvedMeta = getTbmMetadata(canonicalKey);
  if (!resolvedMeta) {
    // console.warn("[MQTT] Unknown tbm_key (dropping heartbeat)", { canonicalKey, topic });
    return;
  }

  const resolvedCanonicalKey = resolvedMeta.canonicalKey ?? canonicalKey;
  if (!resolvedCanonicalKey) {
    console.warn("[MQTT] TBM metadata missing canonical key (dropping heartbeat)", {
      canonicalKey,
      topic,
    });
    return;
  }

  try {
    registerHeartbeatConnectivity(resolvedCanonicalKey, {});
  } catch (err) {
    console.error("[MQTT] Failed to register heartbeat status", err);
  }
};

const handleRealdataMessage = async (topic, payload) => {
  const rawKey = extractTbmKey(topic, payload);
  const canonicalKey = normalizeTbmKey(rawKey);
  if (!canonicalKey) {
    return;
  }

  const resolvedMeta = getTbmMetadata(canonicalKey);
  if (!resolvedMeta) {
    return;
  }

  const resolvedCanonicalKey = resolvedMeta.canonicalKey ?? canonicalKey;
  if (!resolvedCanonicalKey) {
    return;
  }

  try {
    registerRealdataConnectivity(resolvedCanonicalKey, payload, {});
  } catch (err) {
    console.error("[MQTT] Failed to register realdata status", err);
  }

  try {
    await handleRealdataThreshold(resolvedCanonicalKey, payload, {});
  } catch (err) {
    console.error("[MQTT] Failed to process realdata payload", err);
  }
};

const handleMqttMessage = (topic, payload) => {
  if (topic.startsWith("chengtong/heartbeat")) {
    //console.log("handle heartbeat", topic);

    handleHeartbeatMessage(topic, payload);
    return;
  }

  if (topic.startsWith("chengtong/realdata")) {
    handleRealdataMessage(topic, payload);
    return;
  }

  console.log("[MQTT] Ignored topic", topic);
};



const bootstrap = async () => {
  try {
    console.log("=== Backend bootstrap starting ===");

    await refreshTbmMetadata();
    await refreshParameterMetadata();

    await initTbmConnectivityTracking();

    thresholdService.startSubscriptions();
    await thresholdService.initLoadActiveTbmThresholds();


    await deltaThresholdService.initLoadActiveTbmDeltaThresholds();

    //initGuidanceAlertHandler();
    initTbmConnectivityHandler();
    initTbmRealdataHandler();
    initTbmGuidanceDataHandler();

    startTunnelsRealtimeSubscription();
    startParameterRealtimeSubscription();

    getAllTbmMetadata(); // ensure metadata cache snapshot is materialized for admin routes






    console.log("initMqtt");

    initMQTT(handleMqttMessage);

    app.listen(PORT, () => {
      console.log(`🚀 Backend listening on port ${PORT}`);
    });

    console.log("=== Backend bootstrap complete ===");
  } catch (err) {
    console.error("❌ Backend bootstrap failed:", err);
    process.exit(1);
  }
};

bootstrap();
