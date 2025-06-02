# EvalFinal – 2Wheels

**Plateforme de création et modération de posts pour passionnés de deux-roues**

## 🎥 Aperçu

![Aperçu de la page d'accueil](docs/images/screenshot-homepage.png)  
*Figure 1 : Page d’accueil de 2Wheels (desktop)*

## 🔗 Démo en ligne

➡️ [https://2wheels.vercel.app](https://2wheels.vercel.app)

---

## 🛠 Prérequis

- Node.js (v16 ou v18)
- npm (v8 ou supérieure) ou yarn
- Un compte MongoDB Atlas (ou instance MongoDB locale)
- Un compte Cloudinary (pour l’hébergement d’images)
- Git

---

## 🛠 Tech Stack

* **Backend** : Node.js, Express.js, MongoDB Atlas, Mongoose, Cloudinary, JWT  
* **Frontend** : React (Vite), React Router, Axios, React Slick (Carousel)

---

## 🚀 Fonctionnalités

* **CRUD Posts** : création, lecture, mise à jour, suppression de posts  
* **Modération** : interface admin pour valider ou rejeter les posts  
* **Auth** : inscription, connexion (JWT), pages protégées  
* **Profil** : affichage et mise à jour des informations utilisateur  
* **Dashboard** : gestion des posts utilisateur  
* **Likes & Commentaires**  
* **Responsive** : design adapté mobile/tablette/desktop

---

## 🗂 Structure du projet

2Wheels/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── App.jsx
└── README.md

## 📦 Installation locale

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Bvictor7/2Wheels.git
   cd 2Wheels

   Backend

bash:
cd backend
npm install

Frontend

bash:
cd ../frontend
npm install


Variables d’environnement
Dans backend/, créez un fichier .env :

env

MONGO_URI=<votre-mongodb-atlas-uri>
PORT=5000
JWT_SECRET=<une_chaine_secrete>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

Lancer l’application

Backend :

bash:
cd backend
npm run dev      # serveur avec nodemon

Frontend :

bash:
cd frontend
npm run dev      

⚙️ Scripts
Backend (dossier backend/)
npm run dev : démarre le serveur en développement (nodemon)

npm start : démarre le serveur en production (Node pur)

Frontend (dossier frontend/)
npm run dev : démarre Vite en développement (http://localhost:5173)

npm run build : construit la version de production dans /dist/

npm run preview : prévisualise la build statique

📋 Utilisation
1. Créer un utilisateur

curl -X POST https://api.2wheels.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "MotDePasse123"
  }'

  2. Se connecter

bash:
curl -X POST https://api.2wheels.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "MotDePasse123"
  }'

  3. Créer un post (utilisateur authentifié)

  curl -X POST https://api.2wheels.vercel.app/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_TOKEN_JWT>" \
  -d '{
    "title": "Mon premier post",
    "content": "Contenu du post",
    "image": "https://res.cloudinary.com/monCloud/image/upload/v...",
    "tags": ["vélo", "entretien"]
  }'

🚢 Déploiement
Frontend (Vercel)
Connectez le dépôt GitHub à Vercel.

Configurez les variables :

REACT_APP_API_URL=https://api.2wheels.vercel.app/api

Déploiement automatique sur chaque push sur main.
URL : https://2wheels.vercel.app

Figure 2 : Dashboard Vercel – Variables d’environnement
Figure 3 : Vercel – Déploiement « Production » terminé

Backend (Railway)
Connectez le dépôt GitHub à Railway.

Ajoutez les variables :

MONGO_URI=...

JWT_SECRET=...

NODE_ENV=production

Déploiement automatique sur la branche main.
URL : https://api-2wheels-mern.up.railway.app/api

Figure 4 : Dashboard Railway – Variables d’environnement
Figure 5 : Railway – Logs « Build succeeded » et « Application up »

✅ Vérifications post-déploiement
Tester les endpoints (Postman)

Inscription, Connexion, CRUD Articles, Commentaires, Likes.

Vérifier que les statuts HTTP (200, 201, 400, 401, 403, 404) sont corrects.

Tester le front (navigateur)

Naviguer sur https://2wheels.vercel.app.

Tester la création/éditions/suppression de posts après connexion.

Vérifier les logs

Vercel : onglet Logs → aucun warning/erreur critique.

Railway : onglet Logs → pas d’exception ou crash.

Audit Lighthouse

Ouvrir Chrome DevTools → « Lighthouse » → générer un rapport.

Vérifier scores Performance, Accessibilité, SEO, Best Practices.

🔄 Procédure de rollback
Identifier la version

Sur GitHub, récupérer le tag ou le SHA visé (ex : v1.2.0).

Sur Vercel/Railway, noter la version affichée dans les logs.

Revenir à un commit antérieur (locally)

bash:
git fetch --all --tags
git checkout v1.2.0
git push origin main --force
Relancer le déploiement

Vercel détecte automatiquement la mise à jour et redéploie.

Railway : cliquer sur “Deploy” pour déclencher le build.

Re-vérifications

Répéter les étapes de la section « Vérifications post-déploiement ».


🤝 Contribuer
Les contributions sont les bienvenues !

Forkez le dépôt

Créez une branche : git checkout -b feature/ma-fonctionnalité

Commettez vos modifications : git commit -m "Ajout de ma fonctionnalité"

Pushez la branche : git push origin feature/ma-fonctionnalité

Ouvrez une Pull Request

