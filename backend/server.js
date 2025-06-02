// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import postRouter from './routes/posts.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err);
    process.exit(1);
  });

// Montage des routes
// → Auth et user restent inchangés
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Ici, on monte **intégralement** postRouter sur /api/posts
// Les deux routes publiques y sont déjà déclarées avant auth()
app.use('/api/posts', postRouter);

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

