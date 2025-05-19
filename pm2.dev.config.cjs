// pm2.dev.config.cjs

const path = require("path");

module.exports = {
    apps: [
        {
            name: "frontend-dev",
            cwd: "./apps/frontend",                     // 进入 frontend
            script: "node",
            args: "--max-old-space-size=512 node_modules/next/dist/bin/next dev",
            watch: false,
            autorestart: true,
            max_memory_restart: "2000M",
            env: {
                NODE_ENV: "development",
                PORT: 3000,
            },
        },
        {
            name: "backend-dev",
            cwd: path.join(__dirname, "apps/backend"),
            script: "node",
            args: "index.js", // 或是 "src/index.ts"（看你有没有 ts-node）
            watch: false,
            autorestart: true,
            max_memory_restart: "400M",
            env: {
                NODE_ENV: "development",
                PORT: 8080,
            },
        }
    ],
};
