// server.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

console.log("Connexion à MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(PORT, () =>
      console.log(`Backend lancé sur http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Erreur MongoDB :", err.message);
  });

