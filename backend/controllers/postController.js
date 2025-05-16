import Post from '../models/Post.js';

// 1. Récupérer tous les posts approuvés
export const getApprovedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 2. Récupérer tous les posts (optionnellement filtrés par statut) — ADMIN
export const getAllPosts = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const posts = await Post.find(filter).sort({ createdAt: -1 });
  res.json(posts);
};

// 3. Mettre à jour le statut d’un post — ADMIN
export const updatePostStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status))
    return res.status(400).json({ message: 'Statut invalide' });
  const post = await Post.findByIdAndUpdate(id, { status }, { new: true });
  res.json(post);
};

// 4. Créer un nouveau post
export const createPost = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    const image = req.file ? req.file.path : null;
    const newPost = new Post({ title, description, category, author, image });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Récupérer les posts de l’utilisateur connecté
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. Supprimer un post (uniquement si c’est l’auteur)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.userId
    });
    if (!post) return res.status(404).json({ message: 'Post non trouvé ou non autorisé' });
    res.json({ message: 'Post supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7. Mettre à jour un post (titre, description, category, image)
export const updatePost = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    const image = req.file ? req.file.path : undefined;
    const data = { title, description, category, author };
    if (image) data.image = image;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.userId },
      data,
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé ou non autorisé' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



