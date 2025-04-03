# 🌟 Chengtong Vision

> 城通 Vision 平台：基于 Node.js + React.js + PostgreSQL + Supabase + MQTT 构建的智慧数据可视化系统

## 📦 技术栈

- **前端**：React.js + Vite
- **后端**：Node.js (Express)
- **数据库**：PostgreSQL（使用 Supabase 托管）
- **实时通信**：MQTT（设备数据推送）
- **部署管理**：PM2

## 🧩 功能模块

- 实时数据采集（MQTT）
- 数据入库与管理（Supabase/PostgreSQL）
- 可视化面板（React + 图表库）
- 用户权限与配置（可拓展）

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/chengtong-vision.git

# 安装前端
cd frontend
npm install
npm run dev

# 安装后端
cd ../backend
npm install
node index.js
