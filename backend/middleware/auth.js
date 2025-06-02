import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Non autorisé (token manquant)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;       
    req.userId = decoded.id;  

    if (req.originalUrl.includes('/admin') && decoded.role !== 'admin') {
      return res.status(403).json({ message: "Accès interdit (admin requis)" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
}

