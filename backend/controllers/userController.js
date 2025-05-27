import User from '../models/User.js';
import Post from '../models/Post.js';

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name');
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const posts = await Post.find({
      author: req.params.id,
      status: 'approved'
    }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
