# utils 模块

职责

- 提供通用工具：WeChat / SMS 客户端、签名生成、HTTP helpers、retry、logger

建议

- 把现有 `apps/backend/utils` 下的文件保留并在此目录中维护
- 提供统一的 `sendNotification(channel, payload)` 封装，内部路由到具体实现（wechat/sms）
- 提供 `retryWithBackoff` 工具，供持久化或网络调用使用
