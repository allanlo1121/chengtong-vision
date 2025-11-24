# ingest 模块

职责

- 连接并接收来自真实设备的消息（例如 MQTT），也可支持 HTTP 入点
- 解析消息格式、字段校验、时间戳标准化
- 初步过滤（例如心跳 vs realdata）并分发给 processing 模块

接口与输出

- 提供 `start()` 初始化连接
- 当接收到一个有效 payload 时，调用 `processing.handlePayload(tbmcode, payload)` 或发布到内部 queue

示例

```js
// mqttClient.js
mqttClient.on("message", (topic, raw) => {
  const parsed = parseMessage(raw);
  if (isHeartbeat(parsed)) {
    // handle heartbeat (maybe directly publish info.tbm_heartbeat)
  } else {
    processing.handlePayload(parsed.tbmcode, parsed);
  }
});
```

注意事项

- 必须做 basic schema validation，避免非法数据进入 processing
- 对于高吞吐量场景，考虑使用短期内存队列或 backpressure（避免阻塞 mqtt 客户端）
