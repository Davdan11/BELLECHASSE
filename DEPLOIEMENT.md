# Déploiement

Le site est installé sur le VPS Hostinger (Ubuntu 24.04, `31.97.98.22`) **à côté des autres sites**,
avec la même mécanique qu'eux : une application Node sous **PM2** et un bloc **Nginx** avec certificat
**Let's Encrypt** (certbot). Aucun Docker : les fichiers `Dockerfile`, `docker-compose.yml` et
`Caddyfile` restent disponibles pour un hébergement futur, mais ne sont pas utilisés ici.

## Où est quoi sur le VPS

| Élément | Emplacement |
|---|---|
| Code du site | `/var/www/bellechasseenergie.ca` |
| Variables secrètes | `/var/www/bellechasseenergie.ca/.env` |
| Rendez-vous enregistrés | `/var/www/bellechasseenergie.ca/data/rendez-vous.json` |
| Application PM2 | `bellechasse` (port local 3002, `ecosystem.config.cjs`) |
| Bloc Nginx | `/etc/nginx/sites-available/bellechasseenergie.ca` |
| Journaux | `pm2 logs bellechasse` |

## DNS (chez le registraire)

| Nom | Type | Valeur | Registraire | État |
|---|---|---|---|---|
| bellechasseenergie.com | A @ | 31.97.98.22 | Hostinger | en ligne, HTTPS posé le 2026-09-09 |
| www.bellechasseenergie.com | CNAME | bellechasseenergie.com | Hostinger | redirige vers le .com |
| bellechasseenergie.ca | A | 31.97.98.22 | Netfirms | **à faire** (pointe encore vers l'ancien serveur) |
| www.bellechasseenergie.ca | A | 31.97.98.22 | Netfirms | à faire |
| chauffagethermopompeclimatisation.ca | A | 31.97.98.22 | à confirmer | à faire |

Domaine principal (canonique) : `bellechasseenergie.ca` (ancienneté, fiche Google). Les autres
domaines sont redirigés en 301 vers lui, sauf le `.com` qui sert le site directement tant que le
`.ca` n'est pas basculé. Quand le `.ca` pointera vers le VPS, étendre le certificat :

```bash
certbot --nginx --expand -d bellechasseenergie.com -d www.bellechasseenergie.com \
  -d bellechasseenergie.ca -d www.bellechasseenergie.ca -n
```

puis ajouter `bellechasseenergie.com` à la redirection dans le bloc Nginx.

## Certificat HTTPS

Posé par certbot (Let's Encrypt), renouvellement automatique. Pour ajouter un domaine, utiliser
`certbot --nginx --expand` avec tous les noms, une fois leurs DNS propagés.

## Mettre à jour le site

Depuis le Mac, copier les fichiers puis reconstruire sur le VPS :

```bash
rsync -az --delete --exclude node_modules --exclude .next --exclude .git \
  --exclude 'data/*.json' --exclude '.env' --exclude .DS_Store \
  ./ bellechasse-vps:/var/www/bellechasseenergie.ca/
ssh bellechasse-vps 'cd /var/www/bellechasseenergie.ca && ./deploy-vps.sh'
```

`deploy-vps.sh` fait `npm ci`, `npm run build`, puis `pm2 startOrReload` : l'ancienne version
sert les visiteurs jusqu'à ce que la nouvelle soit prête.

## Pipedrive (CRM)

Quand `PIPEDRIVE_API_TOKEN` est renseigné dans `.env`, chaque demande du site est poussée dans
Pipedrive :

- **Formulaire de contact** → une Personne (retrouvée par courriel si elle existe déjà), un Prospect
  « Demande — Nom, Ville (Besoin) » et une Note avec le message.
- **Rendez-vous en ligne** → une Personne, un Prospect « Rendez-vous — Nom, Ville — date, plage »,
  une Note complète (référence, conseiller, adresse, besoin, notes du client) et une **Activité de type
  réunion** à la date et l'heure choisies, d'une durée de 90 minutes, avec l'adresse en lieu.

Pour obtenir le jeton : Pipedrive → icône de profil → Paramètres personnels → API → copier le jeton.
Facultatif : `PIPEDRIVE_OWNER_ID` (utilisateur qui reçoit les prospects, visible dans l'URL de son
profil) et `PIPEDRIVE_LEAD_LABEL_ID` (étiquette « Site web » par exemple).

Si Pipedrive échoue (jeton invalide, panne), la réservation reste enregistrée sur le serveur et les
courriels Resend partent quand même ; l'erreur est visible dans `pm2 logs bellechasse`.

## Variables d'environnement

Éditer `/var/www/bellechasseenergie.ca/.env` (modèle dans `.env.example`), puis
`pm2 restart bellechasse --update-env`. Sans `RESEND_API_KEY` ni `PIPEDRIVE_API_TOKEN`, les demandes sont seulement enregistrées et consignées
dans `pm2 logs bellechasse` : personne n'est prévenu.

## Sauvegarde des rendez-vous

```bash
cp /var/www/bellechasseenergie.ca/data/rendez-vous.json ~/sauvegardes/rendez-vous-$(date +%F).json
```
