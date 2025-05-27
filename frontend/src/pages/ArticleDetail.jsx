import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLikes(res.data.likes || []);
      })
      .catch(console.error);

    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error(err);
      alert("Vous devez être connecté pour commenter.");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Supprimer ce commentaire ?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error(err);
      alert("Suppression non autorisée.");
    }
  };

  const handleLike = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setLikes(res.data.likes || []);
    } catch (err) {
      alert("Connexion requise pour liker.");
    }
  };

  if (!post) return <p className="loading">Chargement…</p>;

  return (
    <div className="detail-page">
      <Link to="/news" className="back-link">← Retour aux actualités</Link>

      {post.image && (
        <img src={post.image} alt={post.title} className="detail-image" />
      )}
      <h1 className="detail-title">{post.title}</h1>
      <div className="detail-meta">
        <span>Par <strong>{post.author?.name || 'Utilisateur supprimé'}</strong></span>
        <span>• {new Date(post.createdAt).toLocaleDateString()}</span>
        <span>• Catégorie : {post.category}</span>
      </div>
      <p className="detail-description">{post.description}</p>

      <div className="like-section">
        <button onClick={handleLike} className="like-button">
          <FaHeart color={likes.includes(userId) ? 'red' : 'gray'} />
          <span>{likes.length}</span>
        </button>
      </div>

      <hr />
      <div className="comments-section">
        <h2>Commentaires</h2>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            rows="3"
          />
          <button type="submit">Envoyer</button>
        </form>

        <div className="comment-list">
          {comments.map(comment => (
            <div key={comment._id} className="comment">
              <p>{comment.content}</p>
              <small>
                {new Date(comment.createdAt).toLocaleDateString()} – {comment.author}
              </small>
              {token && comment.author === userId && (
                <button onClick={() => handleDelete(comment._id)}>Supprimer</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

