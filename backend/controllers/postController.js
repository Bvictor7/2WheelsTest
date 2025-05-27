import Post from '../models/Post.js';

// 1. Récupérer tous les posts approuvés
export const getApprovedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ approved: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 2. Récupérer tous les posts 
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Récupérer un post par ID (ajouté ici pour ArticleDetail)
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Mettre à jour le statut d’un post — ADMIN
export const updatePostStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status))
    return res.status(400).json({ message: 'Statut invalide' });
  const post = await Post.findByIdAndUpdate(id, { status }, { new: true });
  res.json(post);
};

// 5. Créer un nouveau post
export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const image = req.file ? req.file.path : null;

    if (!req.userId || !req.user) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const newPost = new Post({
      title,
      description,
      category,
      image,
      author: req.userId,
      approved: req.user.role === 'admin'
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. Récupérer les posts de l’utilisateur connecté
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7. Supprimer un post (uniquement si c’est l’auteur)
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

// 8. Mettre à jour un post
export const updatePost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const image = req.file ? req.file.path : undefined;
    const data = { title, description, category };
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

// 9. Gérer les likes
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post introuvable' });

    const userId = req.user.id;
    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
