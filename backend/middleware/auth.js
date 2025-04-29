import jwt from 'jsonwebtoken';
export default (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Non autorisé' });
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
};
