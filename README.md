# 🎬 Passion Cinéma

Frontend en **Vue 3 (Vite + Pinia)** — Backend en **Symfony + API Platform**

> Application de découverte et critique de films.

## 📖 Fonctionnalités

- Parcourir et filtrer des films (titre, genre, acteur, réalisateur) avec pagination.
- Consulter une fiche film détaillée (année, synopsis, genres, réalisateurs, acteurs, pays, notes et critiques).
- Créer un compte utilisateur, se connecter (JWT).
- Noter les films, écrire/modifier/supprimer des critiques.
- Créer des collections personnelles et y ajouter / retirer des films.
- Suivre d'autres utilisateurs et consulter leur activité (notes, critiques, collections).

Le frontend consomme une API REST fournie par un backend Symfony + API Platform.

## 🧭 Structure du projet (frontend)

src/
├─ api/
│ └─ axios.js # instance axios (baseURL via VITE_API_URL)
├─ components/
│ ├─ MovieCard.vue
│ ├─ Navbar.vue
│ ├─ Pagination.vue
│ ├─ RatingStars.vue
│ ├─ ReviewCard.vue
│ └─ ReviewForm.vue
├─ store/
│ ├─ auth.js
│ ├─ collections.js
│ ├─ movies.js
│ └─ users.js
├─ views/
│ ├─ Login.vue
│ ├─ MoviesList.vue
│ ├─ MovieDetails.vue
│ ├─ Register.vue
│ ├─ Profile.vue
│ └─ UserCollections.vue
├─ router/
│ └─ index.js
└─ App.vue

## 🔧 Prérequis

- Node.js 18+  
- npm ou yarn  
- Un backend Symfony + API Platform opérationnel (port par défaut : `8000`)  
- Composer pour le backend

## ⚙️ Installation (frontend)

1. Cloner le repo frontend :
```bash
git clone <url-de-ton-repo-frontend>
cd vue-movies
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn
```

3. Créer le fichier d'environnement .env (à la racine du frontend) :
```bash
VITE_API_URL=http://localhost:8000/api
```

4. Démarrer le serveur de développement Vite :
```bash
npm run dev
# ou
yarn dev
```

L'application sera disponible sur : http://localhost:5173/ (ou l'URL indiquée par Vite).

## ⚙️ Démarrage du backend (Symfony)

Le backend est une application Symfony / API Platform. Voici les commandes usuelles (adaptées à ton projet) :

1. Se placer dans le dossier backend :
```bash
cd movies-api
```

2. Installer les dépendances PHP :
```bash
composer install
```

3. Configurer la base de données (adapter .env / .env.local) puis :
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

4. Démarrer le serveur de développement Vite :
```bash
symfony serve
# ou
php -S 127.0.0.1:8000 -t public
```

## 🔐 Authentification
- Endpoint login : POST /api/auth → { "email": "...", "password": "..." }
Réponse attendue : { "token": "..." }
- Token stocké côté client dans localStorage et transmis automatiquement par Axios via l'intercepteur.

## 📡 Endpoints (extraits)
Principaux endpoints utilisés côté frontend (API Platform) :
- GET /api/movies — liste paginée de films
- GET /api/movies/{id} — détails d’un film
- GET /api/genres — liste des genres
- GET /api/genres/{id}/movies — films par genre
- GET /api/casts/{peopleId}/movies — films par acteur
- GET /api/directors/{peopleId}/movies — films par réalisateur
- GET /api/movies/{movieId}/ratings — notes d’un film
- POST /api/ratings — créer une note
- GET /api/movies/{movieId}/reviews — critiques d’un film
- POST /api/reviews — créer une critique
- GET /api/users/{userId}/collections — collections d’un utilisateur
- POST /api/custom_lists — créer une collection
- POST /api/auth — récupérer token (login)

Utilise la doc API Platform (ou GET /api si exposée) pour la liste complète et les schémas.

## 🧩 Conseils d’intégration (frontend)
- Utilise une unique instance Axios (src/api/axios.js) pour centraliser baseURL et l'intercepteur JWT.
- Gère l'état global (utilisateur / token) avec Pinia (store/auth.js).
- Centralise la logique films (fetch, pagination) dans store/movies.js.
- Toujours vérifier et sécuriser les appels POST/PATCH/DELETE par la présence du token.

Attention au CORS : autoriser http://localhost:5173 dans la config Symfony (NelmioCorsBundle).

## 🐞 Débogage (problèmes fréquents)

- Page blanche / erreurs d'import : vérifier vite.config.js alias @ → doit pointer vers src/.
- Cannot find module 'axios' : exécuter npm install axios.
- Erreurs d'exports/imports : être cohérent entre export default api et import api from '@/api/axios' ou export const api + import { api }.
- CORS / ERR_CONNECTION_REFUSED : vérifier que le backend est démarré et que CORS est autorisé pour l'origine du frontend.
- 500 Internal Server Error : consulter les logs Symfony (var/log/dev.log) et la sortie console du serveur Symfony.

## ✅ Bonnes pratiques
- Versionne .env exemple dans .env.example, mais ne commite jamais les secrets réels.
- Écrire des tests unitaires pour les stores et composants critiques.
- Ajouter la persistance Pinia pour garder l’utilisateur connecté.
- Ajouter un middleware/route guard pour les routes protégées (profil, création de critiques, etc.).

## 🤝 Contribuer
Les contributions sont bienvenues : fork → nouvelle branche → PR. Merci d'ajouter des tests et de documenter les changements.