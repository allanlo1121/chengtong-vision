module.exports = {
  apps: [
    {
      name: "BE-dev",
      script: "apps/backend/dist/index.js",   // ⚠ 你的 backend 编译后入口
      cwd: "apps/backend",
      watch: ["dist"],
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development",
      },
      error_file: "../../logs/backend-error.log",
      out_file: "../../logs/backend.log",
      time: true,
    },

    {
      name: "FE-dev",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "apps/frontend",
      watch: false, // Next.js 不适合 PM2 watch
      env: {
        NODE_ENV: "development",
      },
      error_file: "../../logs/frontend-error.log",
      out_file: "../../logs/frontend.log",
      time: true,
    }
  ]
};
