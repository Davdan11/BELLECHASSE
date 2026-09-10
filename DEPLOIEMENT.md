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

Depuis un poste où le dépôt git est à jour (`git pull` d'abord), copier les fichiers puis reconstruire sur le VPS :

```bash
rsync -az --delete --exclude node_modules --exclude .next --exclude .git \
  --exclude 'data/*.json' --exclude '.env' --exclude .DS_Store \
  ./ bellechasse-vps:/var/www/bellechasseenergie.ca/
ssh bellechasse-vps 'cd /var/www/bellechasseenergie.ca && ./deploy-vps.sh'
```

`deploy-vps.sh` fait `npm ci`, `npm run build`, puis `pm2 startOrReload` : l'ancienne version
sert les visiteurs jusqu'à ce que la nouvelle soit prête.

## Pipedrive (CRM)

Même compte et même pipeline que thermopompesavendre.ca. Quand `PIPEDRIVE_API_TOKEN` est renseigné
dans `.env`, chaque demande devient une **affaire** dans le pipeline « 1. VENTES (Acquisition) »,
étape « Nouveau lead », avec le champ **Site web = bellechasseenergie.com** et le titre préfixé
`[BE]` (thermo utilise `[TAV]`). On filtre le tableau par site en un clic.

- **Formulaire de contact** → une Personne (retrouvée par courriel puis téléphone), une Affaire
  « [BE] Nom - Besoin », la Région déduite de la ville, une Note avec le message et la page d'origine.
- **Rendez-vous en ligne** → une Personne, une Affaire « [BE] Nom - Rendez-vous date, plage », une
  Note complète et une **Activité de type réunion** de 90 minutes à la date et l'heure choisies.

Un lead ne se perd jamais : le formulaire de contact écrit d'abord `data/leads/AAAA-MM.jsonl`
(hors dépôt), puis Pipedrive, puis le courriel Resend ; chaque étape est non bloquante. Si Pipedrive
échoue, la demande est acceptée, le courriel porte le préfixe `[CRM À SAISIR]` et le journal indique
la référence à ressaisir. Les rendez-vous ont déjà leur propre fichier `data/rendez-vous.json`.

Variables : `PIPEDRIVE_API_TOKEN` (Pipedrive → profil → Paramètres personnels → API),
`PIPEDRIVE_PIPELINE_ID` (défaut 3), `PIPEDRIVE_OWNER_ID` (facultatif), `LEAD_JOURNAL_DIR` (facultatif).

## Variables d'environnement

Éditer `/var/www/bellechasseenergie.ca/.env` (modèle dans `.env.example`), puis
`pm2 restart bellechasse --update-env`. Sans `RESEND_API_KEY` ni `PIPEDRIVE_API_TOKEN`, les demandes restent dans `data/leads/` et les rendez-vous
dans `data/rendez-vous.json` : personne n'est prévenu.

## Sauvegarde des rendez-vous

```bash
cp /var/www/bellechasseenergie.ca/data/rendez-vous.json ~/sauvegardes/rendez-vous-$(date +%F).json
```
