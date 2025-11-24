# eventbus 模块

职责

- 提供统一的事件契约（createEvent / validateEvent）与发布 API（publishEvent）
- 负责进程内事件分发，建议实现二阶段 persisted 模式（见下）

建议 API

- `createEvent(topic, body)` - 生成标准事件（填充 timestamp / id / validate）
- `validateEvent(ev)` - 校验必要字段
- `publishEvent(topic, ev)` - 发布事件，触发 `event:${topic}` 监听器
- `getBus()` / `initEventBus()` - 暴露 EventEmitter 和批量初始化 listener

二阶段 persisted 流程

- publish raw event -> DB listener persist -> publish persisted topic -> notify listeners

注意

- 当前实现基于 EventEmitter，适合单进程；如需跨进程请替换为 Redis/Kafka/NATS
- 事件契约应尽可能稳定，使用 meta.eventVersion 管理演进
