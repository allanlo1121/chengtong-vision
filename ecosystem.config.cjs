module.exports = {
  apps: [
    {
      name: "admin-app",
      script: "pnpm",
      args: "start",
      cwd: "/srv/chengtong-vision/apps/admin",

      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      max_restarts: 10,
      exp_backoff_restart_delay: 1000,
      restart_delay: 3000,

      watch: false,
      max_memory_restart: "1G",
    },

    {
      name: "realtime-service",
      script: "node",
      args: "dist/main.js",
      cwd: "/srv/chengtong-vision/apps/realtime",

      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      max_restarts: 10,
      exp_backoff_restart_delay: 1000,
      restart_delay: 3000,

      watch: false,
      max_memory_restart: "512M",
    },
  ],
};
