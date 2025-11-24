import axios from 'axios';
import { getTbmMetadata } from '../../datastore/metadataStore.js';

// 企业微信 Webhook 配置
const wechatWebhookUrl =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=6971a499-fce8-4b59-a393-284852490079"

//"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=19d96cb2-6d4d-4afe-8680-aed1c03a4f99";



export const guidanceThresholdsMessage = (tbmId, ringNo, metricsForStorage) => {
  if (!Array.isArray(metricsForStorage)) return '';
  let tbmInfo = getTbmMetadata(tbmId);
  const headerParts = [tbmInfo?.projectShortName, tbmInfo?.tunnelName].filter(Boolean);
  const readableName = headerParts.length ? headerParts.join(" / ") : tbmInfo?.tbmName || "未知设备";
  const details = metricsForStorage.map(metric => {
    let flag = "";
    if (metric) {
      if (metric.severity === 'critical') {
        flag = " 🚨严重超限";
      }
      else if (metric.severity === 'warning') {
        flag = " ⚠️超限";
      }
    }
    return `${metric.paramName || metric.paramCode}: ${metric.value}${metric.unit ? ` ${metric.unit}` : ''}${flag}`;
  }).join('\n');

  const exceededMetrics = metricsForStorage.filter(m => m.severity === 'critical' || m.severity === 'warning');
  const maxThreshold = metricsForStorage
    .map(m => m.threshold)
    .filter(t => typeof t === 'number' && Number.isFinite(t))
    .reduce((max, t) => Math.max(max, t), -Infinity);

  const result = maxThreshold === -Infinity ? null : maxThreshold;
  const message = `😟 ${readableName} 第${ringNo}环: 导向指标超限（>${result}）\n${details}`;
  return message;
};

// 发送企业微信通知的函数
export const sendWechatNotification = async (message) => {

  // console.log("sendWechatNotification", message);
  // const tbmId = message.tbmId;
  // const ringNo = message.ringNo;
  // const metricsForStorage = message.metricsForStorage;

  // const notificationMessage = guidanceThresholdsMessage(tbmId, ringNo, metricsForStorage);


  try {
    const response = await axios.post(wechatWebhookUrl, {
      msgtype: "text",
      text: { content: message },
    });
   // console.log("Notification sent:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};




