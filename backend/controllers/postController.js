import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    const image = req.file
  ? req.file.path 
  : req.body.image || null;
    const newPost = new Post({ title, description, category, author, image });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trouvé' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




