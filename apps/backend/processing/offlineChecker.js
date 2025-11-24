import axios from 'axios';

// 用于保存设备心跳的时间戳和状态
const deviceHeartbeatTimestamps = {};
const deviceStatus = {}; // 用于存储设备的当前状态 (online/offline)

// 心跳超时时间（例如，90秒未收到心跳则认为设备掉线）
const heartbeatTimeout = 90 * 1000; // 90 秒

// 强制刷新时间（10分钟）
const forceRefreshTimeout = 10 * 60 * 1000; // 10 分钟

// 企业微信 Webhook 配置
const wechatWebhookUrl =  
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=6971a499-fce8-4b59-a393-284852490079"

  //"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=19d96cb2-6d4d-4afe-8680-aed1c03a4f99";

// 发送企业微信通知的函数
const sendWechatNotification = async (message) => {
  try {
    const response = await axios.post(wechatWebhookUrl, {
      msgtype: "text",
      text: { content: message },
    });
    console.log("Notification sent:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

// 初始化设备状态和时间戳
const initializeDeviceStatus = (tbmcodes) => {
  tbmcodes.forEach((tbmcode) => {
    // 初始化所有设备为在线状态，并设置初始时间戳
    deviceStatus[tbmcode] = "online";
    deviceHeartbeatTimestamps[tbmcode] = Date.now(); // 设置初始心跳时间
    console.log(
      `Device ${tbmcode} initialized as online at ${new Date().toISOString()}`
    );
  });
};

// 检查设备是否掉线
const checkDeviceHeartbeat = () => {
  const currentTime = Date.now();

  Object.keys(deviceHeartbeatTimestamps).forEach((tbmcode) => {
    const lastHeartbeatTime = deviceHeartbeatTimestamps[tbmcode];
    const timeDifference = currentTime - lastHeartbeatTime;

    // 判断设备是否掉线
    if (
      timeDifference > heartbeatTimeout &&
      deviceStatus[tbmcode] === "online"
    ) {
      console.log(`Device ${tbmcode} is offline.`);
      sendWechatNotification(`设备 ${tbmcode} 已掉线，请检查设备状态。`);
      deviceStatus[tbmcode] = "offline"; // 更新设备状态为掉线
    }
  });
};

// 强制更新设备状态
const forceUpdateDeviceStatus = () => {
  console.log("Force updating device status...");
  const currentTime = Date.now();

  Object.keys(deviceHeartbeatTimestamps).forEach((tbmcode) => {
    const lastHeartbeatTime = deviceHeartbeatTimestamps[tbmcode];
    console.log(`Checking device ${tbmcode} last heartbeat at ${new Date(lastHeartbeatTime).toISOString()}`);

    const timeDifference = currentTime - lastHeartbeatTime;
    console.log(`Time since last heartbeat for ${tbmcode}: ${timeDifference} ms`);

    // 强制更新设备状态，防止设备长时间没有心跳时状态未更新
    if (
      timeDifference > forceRefreshTimeout
    ) {
      console.log(
        `Device ${tbmcode} has not sent heartbeat for 10 minutes. Forcing status update.`
      );
      deviceStatus[tbmcode] = "offline"; // 强制更新设备为掉线状态
      sendWechatNotification(
        `设备 ${tbmcode} 长时间未发送心跳，采集盒子标记为掉线,请检查盒子网络情况。`
      );
    }
  });
};

// 更新设备的心跳时间戳
const updateDeviceHeartbeat = (tbmcode) => {
  deviceHeartbeatTimestamps[tbmcode] = Date.now();
  // console.log(
  //   `Device ${tbmcode} heartbeat updated at ${new Date().toISOString()}`
  // );
};


// 导出检查心跳、更新心跳和强制刷新函数
export {
  initializeDeviceStatus,
  checkDeviceHeartbeat,
  updateDeviceHeartbeat,
  forceUpdateDeviceStatus,
  sendWechatNotification,
};
