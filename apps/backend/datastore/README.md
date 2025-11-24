# datastore 模块（原始数据仓库）

职责

- 保存和提供 TBM / 隧道 / 参数元数据（名称、单位、阈值、参数映射）
- 提供缓存层和刷新机制（避免频繁 DB 查询）
- 提供查询接口：`getTbmMetadata(tbmcode)`, `getParameterMetadata(paramCode)`

现状

- 项目已有 `apps/backend/data/metadataStore.js`（请保留或迁移到此目录）

建议

- 将现有元数据文件迁移或引用到 `datastore`，并保持向后兼容接口
- 提供脚本更新/导入元数据（CSV/JSON）
