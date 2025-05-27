# EvalFinal  
# 2Wheels

**Plateforme de création et modération de posts pour passionnés de deux-roues**

## 🎥 Aperçu

<img src="screenshot-homepage.png" alt="Aperçu de la page d'accueil" width="700" />

## 🔗 Démo en ligne

➡️ [Lien vers la version déployée](https://2wheels.vercel.app) *(à adapter si dispo)*

---

## 🛠 Tech Stack

* **Backend** : Node.js, Express, MongoDB Atlas, Mongoose, Cloudinary, JWT (JSON Web Tokens)  
* **Frontend** : React.js (Vite), React Router, Axios, React Slick (Carousel)

## 🚀 Fonctionnalités

* **CRUD Posts** : création, lecture publique, mise à jour, suppression de posts  
* **Modération** : interface admin pour valider ou rejeter les posts avant publication  
* **Auth** : inscription, connexion (JWT), pages protégées (dashboard, profil, modération)  
* **Profil** : affichage et mise à jour des informations utilisateur  
* **Dashboard** : gestion des posts utilisateur (édition, suppression)  
* **Likes & Commentaires** : possibilité de liker et commenter un post  
* **Profil public** : accessible via `/users/:id` avec les articles publiés  
* **Responsive** : design adaptatif (desktop, tablette, mobile)

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

2. Backend
bash

cd backend
npm install

3. Frontend
bash

cd ../frontend
npm install

📝 Variables d’environnement
Crée un fichier .env dans backend/ :

dotenv
Copier
Modifier
MONGO_URI=<your-mongodb-atlas-uri>
PORT=5000
JWT_SECRET=<une_chaine_secrete>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

⚙️ Scripts
Backend (backend/)

npm run dev : lance le serveur avec nodemon

npm start : lance le serveur en mode production

Frontend (frontend/)

npm run dev : démarre le serveur Vite

npm run build : build statique

npm run preview : prévisualisation de la build