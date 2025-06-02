import Post from '../models/Post.js';

/**
 * 1. Récupérer tous les posts approuvés
 */
export const getApprovedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ approved: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('❌ [getApprovedPosts] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 2. Récupérer tous les posts
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('❌ [getAllPosts] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 3. Récupérer un post par ID (ArticleDetail)
 */
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    res.json(post);
  } catch (err) {
    console.error('❌ [getPostById] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 4. Mettre à jour le statut d’un post — ADMIN
 */
export const updatePostStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const updateFields = { status };
    if (status === 'approved') {
      updateFields.approved = true;
    } else {
      updateFields.approved = false;
    }

    const post = await Post.findByIdAndUpdate(id, updateFields, { new: true });
    if (!post) return res.status(404).json({ message: 'Post introuvable' });
    res.json(post);
  } catch (err) {
    console.error('❌ [updatePostStatus] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 5. Créer un nouveau post
 */
export const createPost = async (req, res) => {
  try {
    // 1. Vérifier que req.body existe et est un objet
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Requête mal formée ou body manquant' });
    }

    const { title, description, category } = req.body;
    const image = req.file ? req.file.path : null;

    // 2. Vérifier que l’utilisateur est authentifié
    if (!req.userId || !req.user) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    // 3. Valider les champs title, description et category
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Le champ "title" est obligatoire' });
    }
    if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'Le champ "description" est obligatoire' });
    }
    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Le champ "category" est obligatoire' });
    }

    // 4. Nettoyer les valeurs
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanCategory = category.trim();

    // 5. Empêcher les doublons de titre pour le même auteur
    const existingPost = await Post.findOne({
      title: cleanTitle,
      author: req.userId
    });
    if (existingPost) {
      return res.status(400).json({ message: 'Un article avec ce titre existe déjà.' });
    }

    // 6. Créer et sauvegarder le nouveau post
    const newPost = new Post({
      title: cleanTitle,
      description: cleanDescription,
      category: cleanCategory,
      image,
      author: req.userId,
      approved: req.user.role === 'admin'
    });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ [createPost] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 6. Récupérer les posts de l’utilisateur connecté
 */
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('❌ [getUserPosts] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 7. Supprimer un post (uniquement si c’est l’auteur)
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.userId
    });
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé ou non autorisé' });
    }
    res.json({ message: 'Post supprimé' });
  } catch (err) {
    console.error('❌ [deletePost] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 8. Mettre à jour un post
 */
export const updatePost = async (req, res) => {
  try {
    // 1. Vérifier que req.body existe et est un objet
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Requête mal formée ou body manquant' });
    }

    const { title, description, category } = req.body;
    const image = req.file ? req.file.path : undefined;
    const data = {};

    if (typeof title === 'string' && title.trim() !== '') {
      data.title = title.trim();
    }
    if (typeof description === 'string' && description.trim() !== '') {
      data.description = description.trim();
    }
    if (typeof category === 'string' && category.trim() !== '') {
      data.category = category.trim();
    }
    if (image) {
      data.image = image;
    }

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
    console.error('❌ [updatePost] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

/**
 * 9. Gérer les likes
 */
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
    console.error('❌ [toggleLike] Erreur complète :', err.stack);
    res.status(500).json({ message: err.message });
  }
};

