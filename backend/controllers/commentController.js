import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({
      postId,
      content,
      author: req.userId 
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      author: req.userId
    });
    if (!comment) return res.status(403).json({ message: "Action non autorisée" });
    res.json({ message: "Commentaire supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
