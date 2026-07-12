# PREDIXION — projet Vercel avec OddsPapi

## Installation sur GitHub

1. Décompressez le ZIP.
2. Ouvrez le dossier `predixion-vercel-api`.
3. Importez **tous les fichiers contenus dans ce dossier** à la racine d’un nouveau dépôt GitHub.
4. Dans Vercel, cliquez sur **Add New → Project** puis importez le dépôt.
5. Framework détecté : **Next.js**. Aucun changement de configuration n’est nécessaire.

## Variables d’environnement Vercel

Dans **Project → Settings → Environment Variables**, ajoutez :

- `ODDSPAPI_API_KEY` : votre nouvelle clé OddsPapi
- `ODDSPAPI_BOOKMAKER` : `pinnacle`
- `ODDSPAPI_TOURNAMENT_IDS` : `17,8`

Cochez Production, Preview et Development, puis relancez un déploiement.

## Sécurité

La clé API reste exclusivement dans la route serveur `/api/matches`. Elle n’est jamais envoyée au navigateur.

La clé précédemment publiée dans une conversation doit être régénérée avant utilisation.

## Fonctionnement

- Avec les variables Vercel : récupération des rencontres et cotes OddsPapi.
- Sans clé ou en cas d’erreur/quota dépassé : affichage automatique de données de démonstration.
- Les crédits et paris sont actuellement une simulation locale d’interface.
- Aucun paiement en argent réel n’est intégré.

## Modifier les compétitions

Changez `ODDSPAPI_TOURNAMENT_IDS` avec une liste d’identifiants séparés par des virgules.

Exemple : `17,8`

## Développement local

```bash
npm install
npm run dev
```

Créez `.env.local` à partir de `.env.example`.
