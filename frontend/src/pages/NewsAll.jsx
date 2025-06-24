import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import API from '@services/api';
import './News.css';

export default function NewsAll() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchPosts = () => {
    API.get('/posts/all')
      .then(res => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(fetchPosts, []);

  const handleLike = async postId => {
    try {
      await API.patch(`/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch {
      alert("Connexion requise pour liker.");
    }
  };

  if (loading) return <p className="news-loading">Chargement des nouveautés…</p>;
  if (!posts.length) return <p className="news-empty">Aucune actualité pour le moment.</p>;

  return (
    <div className="news-page">
      <h1>Nouveautés</h1>
      <div className="news-grid">
        {posts.map(post => (
          <div key={post._id} className="news-card">
            {post.image && (
              <img src={post.image} alt={post.title} className="news-img" />
            )}
            <div className="news-content">
              <h3>{post.title}</h3>
              <p>{post.description.slice(0, 100)}…</p>
              <small className="news-date">
                {new Date(post.createdAt).toLocaleDateString('fr-FR')} • {post.status}
              </small>
              <div className="news-footer">
                <Link to={`/posts/${post._id}`} className="news-link">
                  Lire la suite
                </Link>
                <button onClick={() => handleLike(post._id)} className="like-button">
                  <FaHeart color={post.likes.includes(userId) ? 'red' : 'gray'} />
                  <span>{post.likes.length}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
