import axios from "axios";
import crypto from "crypto";
import { getTbmMetadata } from '../../datastore/metadataStore.js';

const DEFAULT_SMS_CONFIG = {
    endpoint: "https://back.aichitu.com/api/vi/sendMessage",
    username: "13636685581",
    password: "$2a$10$oIIKUzCeEDG2F2eCCJuV2eLMbNdRSBe3Ni6PiWkxqoCf0db7PnT7m",
    mobiles: ["13636685581","18200238495","13540677814"],
};

const buildSignature = (username, password, timestamp) => {
    const payload = `${username}${password}${timestamp}`;
    return crypto.createHmac("sha256", 'chituyunxin').update(payload).digest("hex");
};

export const guidanceThresholdsSmsMessage = (tbmId, ringNo, metricsForStorage) => {
    if (!Array.isArray(metricsForStorage)) return '';
    let tbmInfo = getTbmMetadata(tbmId);
    const headerParts = [tbmInfo?.projectShortName, tbmInfo?.tunnelName].filter(Boolean);
    const readableName = headerParts.length ? headerParts.join(" / ") : tbmInfo?.tbmName || "未知设备";
    const details = metricsForStorage.map(metric => {
        let flag = "";
        if (metric) {
            if (metric.severity === 'critical') {
                flag = "严重超限";
            }
            else if (metric.severity === 'warning') {
                flag = "超限";
            }
        }
        return `${metric.paramName || metric.paramCode}: ${metric.value}${metric.unit ? ` ${metric.unit}` : ''}${flag}`;
    }).join(',');

    const exceededMetrics = metricsForStorage.filter(m => m.severity === 'critical' || m.severity === 'warning');
    const maxThreshold = metricsForStorage
        .map(m => m.threshold)
        .filter(t => typeof t === 'number' && Number.isFinite(t))
        .reduce((max, t) => Math.max(max, t), -Infinity);

    const result = 50 // maxThreshold === -Infinity ? null : maxThreshold;
    const message = `【成都相传】 ${readableName} 导向环号:${ringNo}  导向指标超限（>${result}）,${details}`;
    return message;
};

export const sendSmsNotification = async ({
    endpoint = DEFAULT_SMS_CONFIG.endpoint,
    username = DEFAULT_SMS_CONFIG.username,
    password = DEFAULT_SMS_CONFIG.password,
    mobiles = DEFAULT_SMS_CONFIG.mobiles,
    content,
    scheduleTime,
}) => {
    if (!endpoint) {
        throw new Error("Missing SMS endpoint");
    }
    if (!username || !password) {
        throw new Error("Missing SMS credentials");
    }
    if (!Array.isArray(mobiles) || !mobiles.length) {
        throw new Error("Mobiles must be a non-empty array");
    }
    if (!content) {
        throw new Error("Missing SMS content");
    }

    content = `【百事通】 ${content}`;

   // console.log("content", content);


    const timestamp = Date.now().toString();
    const signature = buildSignature(username, password, timestamp);

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        "X-Timestamp": timestamp,
        "X-Signature": signature,
    };



    // const tbmId = constent.tbmId;
    // const ringNo = constent.ringNo;
    // const metricsForStorage = constent.metricsForStorage;

    // const content= guidanceThresholdsSmsMessage(tbmId, ringNo, metricsForStorage);

    const payload = {
        username,
        password,
        mobiles,
        content,
    };

   // console.log("smsSend", payload);


    if (scheduleTime) {
        payload.scheduleTime = scheduleTime;
    }

    try {
       // console.log("[SmsSender] POST headers:", headers);
        const response = await axios.post(endpoint, payload, { headers });
      //  console.log("smsSend", response);

        return response.data;
    } catch (error) {
        console.error("Error sending SMS notification:", error.response?.data || error.message);
        throw error;
    }
};
