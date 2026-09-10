#!/usr/bin/env bash
# À lancer sur le VPS dans /var/www/bellechasseenergie.ca après une mise à jour des fichiers.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p data
npm ci --no-audit --no-fund
npm run build
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save >/dev/null
echo "Déployé."
