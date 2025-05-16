import Post from '../models/Post.js';

export const listAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approvePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndUpdate(id, { approved: true });
    res.json({ message: 'Post approuvé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectPost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post rejeté et supprimé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
