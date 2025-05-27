// src/pages/NewsAll.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import './News.css';

export default function NewsAll() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts/all')
      .then(res => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.patch(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { data } = await axios.get('http://localhost:5000/api/posts/all');
      setPosts(data);
    } catch (err) {
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
