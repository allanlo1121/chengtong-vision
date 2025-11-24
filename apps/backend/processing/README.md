# processing 模块

职责

- 对来自 ingest 的 payload 执行业务规则：阈值判断（alerts）、聚合、异常检测、环位完成检测等
- 生成标准化事件（调用 eventbus.createEvent & publishEvent）而不是直接触发通知
- 维持规则插件化：每个检测/规则可以作为子模块独立测试

接口

- `handlePayload(tbmcode, payload)` - 入口方法
- 规则返回：`null` 或 `EventBody`（供 createEvent 使用）或数组 of EventBody

示例（伪代码）

```js
const evBody = {
  tbmcode,
  ringNo: payload.s100100008,
  message: '导向超限',
  metrics: [ ... ],
  severity: 'warning',
  payload
};
const ev = createEvent('alerts.guidance', evBody);
publishEvent('alerts.guidance', ev);
```

注意

- processing 只负责判断，不做持久化或通知
- 为了测试，用纯函数实现规则，避免 side-effects
- 使用 metadataStore 查询参数单位/名称/阈值配置
