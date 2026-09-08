# Ajouter un article au blogue

1. Créez un fichier `.md` dans ce dossier. Le nom du fichier devient l'adresse : `ma-page.md` → `/blogue/ma-page`.
   Utilisez des minuscules, sans accents ni espaces, avec des tirets.
2. Copiez l'en-tête ci-dessous en haut du fichier et remplissez-le.
3. Écrivez l'article en Markdown sous l'en-tête (titres avec `##`, listes avec `-`, gras avec `**`).
4. Déposez la photo dans `public/` et indiquez son nom dans `image`.
5. Sauvegardez. L'article apparaît dans la liste, le sitemap et les articles liés automatiquement.

```
---
title: "Titre de l'article"
excerpt: "Une phrase courte affichée dans la liste."
description: "Description pour Google, 140 à 160 caractères, avec les mots clés."
category: thermopompes        # thermopompes | entretien | chauffage | financement | conseils
tags: ["thermopompe", "Daikin", "Montréal"]
date: 2026-09-15              # AAAA-MM-JJ
author: "Bellechasse Énergie"
image: "/ma-photo.jpg"
imageAlt: "Description de la photo"
featured: false               # true = article à la une (un seul)
faq:
  - q: "Question fréquente?"
    a: "Réponse courte et claire."
---
```

Options : `updated: 2026-10-01` (date de mise à jour), `imageFit: contain` (photo sur fond clair sans recadrage), `video: "https://..."` (affiche « Voir la vidéo »).
