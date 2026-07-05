module.exports = {
  apps: [
    {
      name: "backm-api",
      cwd: __dirname,
      script: "server.js",
      interpreter: "node",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      error_file: "./logs/backm-api-error.log",
      out_file: "./logs/backm-api-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
