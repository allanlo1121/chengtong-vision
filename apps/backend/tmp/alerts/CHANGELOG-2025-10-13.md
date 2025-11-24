# CHANGELOG — alerts module (2025-10-13)

## 概要

修复 `realtime_threshold_events` 重复写入的问题：当一次 payload 包含多个超限参数（例如 4 个）时，之前的逻辑会为每个参数创建一条 `realtime_threshold_events`（导致 4 条 event），现已修改为：每次通知仅写入一条 `realtime_threshold_events`，并在 `realtime_threshold_event_metrics` 表中插入对应的多条 metric 记录。

## 问题原因

- 之前在 `realdataNotifier.js` 中，对于每个超限参数都会单独构造并调用 `recordThresholdEvent`，导致每个参数都生成一条事件记录。虽然 `recordThresholdEvent` 本身会在 `realtime_threshold_event_metrics` 中插入 metric，但事件层面重复.

## 变更点

- 文件：`apps/backend/alerts/realdataNotifier.js`

  - 将“每个参数单独创建 event” 的逻辑替换成：
    - 筛选出需要创建的 metric 列表（`metricsToCreate`），
    - 根据该列表计算整体事件严重等级（若任一 metric 为 critical 则事件为 critical），
    - 一次性调用 `recordThresholdEvent` 创建单条事件并批量写入 metrics。
  - 保留了原有基于 `ring_no` 的去重逻辑与升级（warning -> critical）判断。

- 文件：`apps/backend/alerts/alertsRepository.js`
  - 无需修改（保留现有：先 insert event -> 再批量 insert metrics）。

## 验证步骤（已执行）

1. 使用新的 TBM id 触发一次包含 4 个超限参数的通知，观察数据库与日志：

```bash
cd apps/backend
node -e "(async()=>{ const { notifyRealdataThreshold } = await import('./alerts/realdataNotifier.js'); const { findOpenEventsByTbm } = await import('./alerts/alertsRepository.js'); const tbm = 'TBM_UNITTEST_'+Date.now(); const payload = {s100206003:60,s100206004:61,s100206006:62,s100206007:63,s100100008:999}; console.log('using tbm', tbm); await notifyRealdataThreshold(tbm,payload); console.log('--- notified ---'); const res = await findOpenEventsByTbm(tbm); console.log('open events count =', (res.events||[]).length); console.log('byEvent mapping keys =', Object.keys(res.byEvent||{})); console.log('byParam mapping keys =', Object.keys(res.byParam||{})); console.log('done'); })()"
```

预期输出：

- 控制台显示 `open events count = 1`
- `byParam` 列表包含 4 个参数 key（说明 metrics 插入了 4 条）

（我已在本地执行并观测到上述结果。）

## 注意与建议

- 事务性：当前 `recordThresholdEvent` 是两步写入（先 insert event，再 insert metrics）。若你需要严格的原子性，建议将两步改成事务或在数据库端写一个函数/存储过程以确保原子性；Supabase/Postgres 支持事务，需在当前 supabase 客户端或服务端实现。

- 日志/监控：建议记录事件创建的 eventId 与 metrics 数量（已经可从 repository 返回 eventId），便于后续追踪和回溯。

- 索引/约束：建议确保 `realtime_threshold_event_metrics.event_id` 有索引和外键，以便查询和完整性验证。

- 自动化测试：建议添加一个简单的集成测试（如 Jest 或 node 脚本）来验证“1 event + N metrics”行为，防止回归。

## 后续动作（可选）

- 将此变更提交到 `dev` 分支并创建 PR。提交信息建议：`fix(alerts): create single event per notification, store multiple metrics (2025-10-13)`。
- 实现事务性插入或 DB 侧函数以提高一致性。
- 根据需要添加集成测试与 CI 校验。

## 新增 (2025-10-13): alert_type 字段

- 在 `realtime_threshold_events` 表中新增 `alert_type` 字段（nullable），用于标识事件类别，例如 `guidance`（导向预警）。
- 新增 `alert_types` 参考表 `public.alert_types`，包含 code/name/description 便于管理可用类型。
- 已添加迁移脚本：`db/migrations/20251013_add_alert_type.sql`。
- 代码变更：`apps/backend/alerts/alertsRepository.js` 支持 `alertType` 可选参数，通知实现（guidance notifiers）会传入 `alertType: 'guidance'`。

部署备注：在将迁移应用到生产前，请先在 DB 中运行迁移并（可选）插入基础类型行，例如：

```sql
INSERT INTO public.alert_types(code,name,description) VALUES ('guidance','导向预警','导向参数超限的预警');
```

---

变更作者：自动化助理（由你触发）
日期：2025-10-13
