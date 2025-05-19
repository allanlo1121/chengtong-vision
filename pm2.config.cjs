module.exports = {
  apps: [
    {
      name: "next-dev",
      script: "node",
      args: "--max-old-space-size=512 node_modules/next/dist/bin/next dev",
      watch: false,
      autorestart: true,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
  ],
};