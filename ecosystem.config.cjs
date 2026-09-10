// Configuration PM2 pour le VPS (voir DEPLOIEMENT.md).
module.exports = {
  apps: [
    {
      name: 'bellechasse',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3002 -H 127.0.0.1',
      env: { NODE_ENV: 'production', PORT: '3002' },
      max_memory_restart: '600M',
      autorestart: true,
      time: true,
    },
  ],
};
