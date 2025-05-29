// pm2.dev.config.cjs

const path = require("path");

module.exports = {
  apps: [
    {
      name: "backend-dev",
      cwd: path.join(__dirname, "apps/backend"),
      script: "node",
      args: "index.js",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "development",
        PORT: 8080,
      },
      wait_ready: true,          // 等待后端发出 ready 信号
      listen_timeout: 10000,     // 最多等 10 秒
    },
    {
      name: "frontend-dev",
      cwd: "./apps/frontend",
      script: "node",
      args: "node_modules/next/dist/bin/next dev", // 去掉内存限制参数
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
  ],
};
