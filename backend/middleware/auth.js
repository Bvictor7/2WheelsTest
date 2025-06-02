import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  // 1. Récupération du token (ou undefined)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Non autorisé (token manquant)" });
  }

  try {
    // 2. Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;       // contient { id, role, iat, exp }
    req.userId = decoded.id;  // plus pratique dans les contrôleurs

    // 3. Blocage des routes '/admin' si rôle ≠ 'admin'
    if (req.originalUrl.includes('/admin') && decoded.role !== 'admin') {
      return res.status(403).json({ message: "Accès interdit (admin requis)" });
    }

    // 4. Tout est OK : on passe au contrôleur
    next();
  } catch (err) {
    // 5. Token invalide (faux, expiré, malformé…)
    return res.status(403).json({ message: "Token invalide" });
  }
}


