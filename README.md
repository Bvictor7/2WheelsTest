# EvalFinal
# 2Wheels

**Plateforme de création et modération de posts**

## 🛠 Tech Stack

* **Backend** : Node.js, Express, MongoDB Atlas, Mongoose, Cloudinary, JWT (JSON Web Tokens)
* **Frontend** : React.js (Vite), React Router, Axios, React Slick (Carousel)

## 🚀 Fonctionnalités

* **CRUD Posts** : création, lecture publique, mise à jour, suppression de posts
* **Modération** : interface admin pour valider ou rejeter les posts avant publication
* **Auth** : inscription, connexion (JWT), pages protégées (dashboard, profil, modération)
* **Profil** : affichage et mise à jour des informations utilisateur
* **Dashboard** : gestion des posts utilisateur (édition, suppression)
* **Responsive** : design adaptatif (desktop, tablette, mobile)

## 📦 Installation locale

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/Bvictor7/2Wheels.git
   cd 2Wheels
   ```
2. **Backend**

   ```bash
   cd backend
   npm install
   ```
3. **Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

## 📝 Variables d’environnement

Crée un fichier `.env` dans **backend/** :

```dotenv
MONGO_URI=<your-mongodb-atlas-uri>
PORT=5000
JWT_SECRET=<une_chaine_secrete>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

## ⚙️ Scripts

* **Backend** (à la racine du dossier `backend/`)

  * `npm run dev` : lance le serveur avec **nodemon**
  * `npm start`    : lance le serveur en mode production

* **Frontend** (à la racine du dossier `frontend/`)

  * `npm run dev`  : démarre le serveur Vite en dev
  * `npm run build`: génère la version statique dans `dist/`
  * `npm run preview`: prévisualise la build

## 🚢 Déploiement

1. **Backend**

   * Plateformes recommandées : Heroku, Railway, Render
   * Configurer les **Config Vars** (MONGO\_URI, JWT\_SECRET, CLOUDINARY\_\*)
   * Déployer depuis la branche `main`
   * Vérifier que l’URL publique de l’API est accessible en HTTPS

2. **Frontend**

   * Plateformes recommandées : Vercel, Netlify
   * Branch to deploy : `main`
   * Définir **Build Command** : `npm run build`
   * Définir **Publish directory** : `dist`
   * Définir **Environment variables** (pour pointer vers l’API déployée)

## 🔧 Tests finaux

* Créer un compte admin, se connecter, modérer un post
* Créer un post, modifier, supprimer via Dashboard
* Vérifier Responsive sur mobile/tablette
* Vérifier performance (Lighthouse)

---

**2Wheels** • Victor | Mai 2025
