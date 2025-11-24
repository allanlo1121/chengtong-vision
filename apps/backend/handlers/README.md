# handlers 模块（事件处理）

职责

- 订阅 eventbus 的 topic 并对事件进行处理：持久化、通知、指标上报、任务调度等

子模块建议

- handlers/db/ - 持久化事件与 metrics（在 DB 中实现事务化插入）
- handlers/notify/ - WeChat / SMS 通知器（渠道格式化与重试策略）
- handlers/metrics/ - 将事件转换为统计/时序数据
- handlers/tasks/ - 根据事件触发下游任务或工作流

设计要点

- 订阅 persisted 话题（如果使用二阶段）以保证持久化先行
- Handler 内部必须完整捕获异常并记录，不影响其他 handler
- 可配置重试策略（失败写入 dead-letter）
