<p align="center">
  <img src="https://img.shields.io/badge/2Wheels-EvalFinal-blue?style=for-the-badge&amp;logo=appveyor" alt="2Wheels" />
  <br/>
  <em>Plateforme de création et modération de posts pour passionnés de deux-roues</em>
</p>

<p align="center">
  <a href="#-aperçu">🎥 Aperçu</a> •
  <a href="#-démo-en-ligne">🔗 Démo en ligne</a> •
  <a href="#-tech-stack">🛠 Tech Stack</a> •
  <a href="#-fonctionnalités">🚀 Fonctionnalités</a> •
  <a href="#-structure-du-projet">🗂 Structure du projet</a> •
  <a href="#-installation-locale">📦 Installation locale</a> •
  <a href="#-scripts">⚙️ Scripts</a>
</p>

---

## 🎥 Aperçu

<img src="screenshot-homepage.png" alt="Aperçu de la page d'accueil" width="700" />

---

## 🔗 Démo en ligne

➡️ [Voir la démo déployée](https://2wheels.vercel.app) *(à adapter si nécessaire)*

---

## 🛠 Tech Stack

<table>
  <tr>
    <td align="center"><strong>Backend</strong></td>
    <td align="center"><strong>Frontend</strong></td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB Atlas &amp; Mongoose</li>
        <li>Cloudinary</li>
        <li>JWT (JSON Web Tokens)</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>React.js (Vite)</li>
        <li>React Router</li>
        <li>Axios</li>
        <li>React Slick (Carousel)</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Fonctionnalités

- **CRUD Posts** : création, lecture publique, mise à jour, suppression  
- **Modération** : interface admin pour valider ou rejeter les posts avant publication  
- **Auth & Sécurité** :  
  - Inscription / connexion (JWT)  
  - Routes et pages protégées (dashboard, profil, modération)  
- **Profil Utilisateur** : affichage et mise à jour des informations personnelles  
- **Dashboard** :  
  - Gestion des posts de l’utilisateur (édition, suppression)  
  - Statut de publication  
- **Likes & Commentaires** : liker et commenter les posts  
- **Profil Public** : accessible via `/users/:id`, affichant les articles publiés  
- **Responsive** : design adaptatif (desktop, tablette, mobile)

---

## 🗂 Structure du projet

\`\`\`text
2Wheels/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── vite.config.js
└── README.md
\`\`\`

---

## 📦 Installation locale

1. **Cloner le dépôt**

   \`\`\`bash
   git clone https://github.com/Bvictor7/2Wheels.git
   cd 2Wheels
   \`\`\`

2. **Backend**

   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. **Frontend**

   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

### 📝 Variables d’environnement

Dans \`backend/\`, créez un fichier \`.env\` :

\`\`\`dotenv
MONGO_URI=<votre-mongodb-atlas-uri>
PORT=5000
JWT_SECRET=<une_chaine_secrete>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
\`\`\`

---

## ⚙️ Scripts

### Backend (dossier \`backend/\`)

| Script         | Description                                |
| -------------- | ------------------------------------------ |
| \`npm run dev\`  | Démarre le serveur avec **nodemon**        |
| \`npm start\`    | Démarre le serveur en mode **production**  |

### Frontend (dossier \`frontend/\`)

| Script             | Description                                |
| ------------------ | ------------------------------------------ |
| \`npm run dev\`      | Démarre le serveur de développement (Vite) |
| \`npm run build\`    | Génère la version statique optimisée       |
| \`npm run preview\`  | Prévisualise la build                      |

---

## 📝 Licence

Ce projet est distribué sous la licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d’informations.

<p align="center">
  &copy; 2025 2Wheels • <a href="https://github.com/Bvictor7/2Wheels">GitHub</a>
</p>
