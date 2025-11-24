# backend 模块概览

本目录说明 backend 的推荐模块划分与职责。目标：把接收、处理、事件发布与事件处理分离，便于测试、扩展与迁移到 TypeScript（渐进式）。

推荐目录（逻辑）

- ingest/ — 接收 MQTT/HTTP 数据（realdata / heartbeat）并做初步解析与校验
- processing/ — 数据处理（阈值判断、聚合、异常检测）并决定是否生成事件
- eventbus/ — 事件契约、createEvent、publishEvent、validateEvent
- handlers/ — 订阅事件并处理：持久化、通知、指标、任务触发等
- datastore/ — 原始数据仓库：TBM/隧道/参数元数据、阈值与映射
- utils/ — 公用工具（wechat/sms/crypto/log/retry 等）

迁移策略（TypeScript）

- 先不改现有运行时文件（按你要求）。
- 建议逐步将核心 infra（eventbus、handlers/db、handlers/notify）先迁移到 TS。
- 可以先添加 `tsconfig.json`（allowJs: true）并在 CI 中执行 `tsc --noEmit` 来逐渐校验类型。

下文每个子目录都有独立说明（见对应 README）。
