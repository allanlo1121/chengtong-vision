#!/bin/bash

echo "🚀 Starting Chengtong Vision Backend (Production Mode)"

# 加载环境变量（.env.production）
if [ -f ".env.production" ]; then
  export $(grep -v '^#' .env.production | xargs)
  echo "✓ Loaded .env.production"
else
  echo "⚠️ WARNING: .env.production not found!"
fi

# 构建 TS → JS
pnpm build

# 确保 logs 目录存在
mkdir -p logs

# 启动 PM2
pm2 start ecosystem.config.cjs --env production

echo "Backend started! View logs using:"
echo "  pm2 logs backend"
