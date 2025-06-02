import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 MongoDB connecté');

    const email = 'belahcene2@gmail.com';
    const plainPwd = 'monNouveauMotDePasse'; 
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Aucun utilisateur trouvé avec cet email');
      process.exit(1);
    }

    console.log('Utilisateur chargé :', {
      email: user.email,
      hash: user.password
    });

    // 3) Compare
    const match = await bcrypt.compare(plainPwd, user.password);
    console.log(`Comparaison mot de passe : ${match ? 'match' : 'mismatch'}`);

  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

run();
