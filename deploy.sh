#!/usr/bin/env bash
# Met à jour le site sur le VPS : récupère le code, reconstruit l'image, redémarre sans interruption visible.
set -euo pipefail
cd "$(dirname "$0")"
git pull --ff-only
docker compose build site
docker compose up -d
docker image prune -f >/dev/null
echo "Déployé : $(git rev-parse --short HEAD)"
