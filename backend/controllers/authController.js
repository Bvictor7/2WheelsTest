import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash, role: role || 'user' });
    await user.save();
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  // Debug logs to inspect incoming data
  console.log('🔍 [Login] req.headers.Authorization =', req.headers.authorization);
  console.log('🔍 [Login] req.body =', req.body);

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email déjà utilisé' });
    res.status(500).json({ message: err.message });
  }
};

