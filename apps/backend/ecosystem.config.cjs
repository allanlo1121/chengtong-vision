module.exports = {
  apps: [
    {
      name: "backend",
      script: "dist/app/index.js",          // 生产环境运行编译后的 JS
      instances: 1,                     // 可改为 "max"
      exec_mode: "cluster",             // 推荐 cluster 模式
      
      // 环境变量（默认）
      env: {
        NODE_ENV: "development",
        PORT: 8096
      },

      // 生产环境变量
      env_production: {
        NODE_ENV: "production",

        // 自动读取 .env.production
        // PM2 无法自动加载 dotenv-flow，因此手动注入
        // 推荐在启动命令前 source .env.production
        PORT: process.env.PORT || 8096
      },

      // 日志管理
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-out.log",
      merge_logs: true,
      max_restarts: 10,
      restart_delay: 5000
    }
  ]
};
