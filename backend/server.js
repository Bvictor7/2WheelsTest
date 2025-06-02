import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import commentRoutes from './routes/comment.js'; 
import userRoutes from './routes/user.js';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes); 
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Le serveur fonctionne.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
