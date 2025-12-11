🎬 VueMovies — Application de découverte et critique de films

Frontend en Vue 3 + Vite + Pinia — Backend en Symfony + API Platform

📖 Présentation

VueMovies est une application web permettant de :

Explorer une liste de films (pagination, recherche, filtres)

Afficher la fiche détaillée d’un film (genres, casting, notes, critiques…)

Créer un compte utilisateur

Noter des films

Écrire des critiques

Ajouter des films à des collections personnalisées

Suivre d’autres utilisateurs et voir leur activité (notes, critiques, collections)

Consulter un fil d’actualité personnalisé

Le frontend utilise Vue 3 (Composition API), Vite, Pinia, Axios, et l’API REST exposée par API Platform.

🚀 Technologies principales
🖥️ Frontend

Vue 3 + Composition API

Vite

Pinia (gestion d’état)

Vue Router

Axios

Iconify + Phosphor Icons

🔗 Backend

Symfony

API Platform

PostgreSQL (ou MySQL selon config)

JWT authentication (LexikJWT)

📂 Structure du projet (Frontend)
src/
│
├─ api/
│   └─ axios.js        → instance Axios configurée
│
├─ components/
│   ├─ MovieCard.vue
│   ├─ RatingStars.vue
│   ├─ Pagination.vue
│   ├─ ReviewCard.vue
│   └─ ReviewForm.vue
│
├─ store/
│   ├─ auth.js
│   ├─ movies.js
│   └─ user.js
│
├─ views/
│   ├─ MoviesList.vue
│   ├─ MovieDetails.vue
│   ├─ Login.vue
│   ├─ Register.vue
│   ├─ Profile.vue
│   └─ UserCollections.vue
│
├─ router/
│   └─ index.js
│
└─ App.vue

⚙️ Installation & Lancement
🧩 Prérequis

Node.js 18+

npm ou yarn

Un backend API Platform fonctionnel (voir section configuration)

📦 Installation du frontend
git clone https://github.com/ton-user/vue-movies.git
cd vue-movies
npm install

▶️ Lancer le serveur de développement
npm run dev


L’application sera disponible sur :

http://localhost:5173/

🔧 Configuration
🌐 Variables d’environnement

Créer un fichier .env à la racine du projet :

VITE_API_URL=http://localhost:8000/api


Cela permet à Axios de cibler automatiquement l’API Symfony.

🔒 Authentification

Une fois le backend configuré avec JWT, le frontend :

génère un token via /api/auth

stocke le token et le user dans localStorage

configure Axios pour envoyer automatiquement Authorization: Bearer <token>

🎯 Fonctionnalités principales
🎞️ Films

Pagination

Recherche par titre

Filtre par genre

Filtre par acteur

Filtre par réalisateur

Carte Film avec note moyenne + note utilisateur

⭐ Notes

Noter un film

Modifier une note

Supprimer une note

Afficher la répartition des notes (à venir)

📝 Critiques

Lire les critiques d’un film

Rédiger une critique

Modifier / Supprimer sa critique

Like / dislike (option future)

📁 Collections

Créer des listes personnelles

Ajouter / retirer des films dans une liste

Afficher les collections d’un utilisateur

👥 Social

Suivre un utilisateur

Voir ses notes

Voir ses critiques

Voir ses collections

Fil d’actualité : /api/feed

🧪 Améliorations possibles

Mise en cache locale (Pinia persist / localStorage)

Dark mode

Recherche avancée (multi-filtres combinés)

Système de recommandations

Interface mobile améliorée (responsive complet)

🤝 Contributions

Les contributions sont les bienvenues !
Forkez le repo, créez une branche et ouvrez une PR.

📜 Licence

Ce projet est disponible sous licence MIT.
