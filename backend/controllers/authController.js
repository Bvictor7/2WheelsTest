import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log('🔍 [Register] req.body =', req.body);
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Requête mal formée ou body manquant' });
  }

  const { name, email, password, role } = req.body;
  console.log('🔍 [Register] name, email, password présents ?', name, email, typeof password);

  try {
    const existing = await User.findOne({ email });
    console.log('🔍 [Register] utilisateur existant ?', existing);
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hash = await bcrypt.hash(password, 10);
    console.log('🔍 [Register] mot de passe hashé =', hash);

    const user = new User({ name, email, password: hash, role: role || 'user' });
    const saved = await user.save();
    console.log('✅ [Register] nouvel utilisateur sauvegardé =', saved);

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    console.error('❌ [Register] Erreur détectée :', err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  // Vérifier la présence du body et de ses champs
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Requête mal formée ou body manquant' });
  }
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email et mot de passe sont obligatoires' });
  }

  console.log('🔍 [Login] req.headers.Authorization =', req.headers.authorization);
  console.log('🔍 [Login] req.body =', req.body);

  try {
    const user = await User.findOne({ email }).select('+role');
    console.log('🔍 [Login] utilisateur trouvé ?', !!user, user && user.email);
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

    const valid = await bcrypt.compare(password, user.password);
    console.log('🔍 [Login] bcrypt.compare =', valid);
    if (!valid) return res.status(401).json({ message: 'Identifiants invalides' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  // On applique la même vérification sur req.body si on va lire des champs
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Requête mal formée ou body manquant' });
  }

  try {
    const updates = {};
    if (typeof req.body.name === 'string') updates.name = req.body.name;
    if (typeof req.body.email === 'string') updates.email = req.body.email;
    if (typeof req.body.password === 'string') {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    res.status(500).json({ message: err.message });
  }
};


