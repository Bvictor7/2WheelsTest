import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminActualite.css';

export default function AdminActualite() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts/admin?status=pending', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setPosts(res.data))
    .catch(console.error);
  };

  useEffect(fetchPosts, []);

  const handleStatus = (id, status) => {
    axios.patch(`http://localhost:5000/api/posts/admin/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
    .then(fetchPosts)
    .catch(console.error);
  };

  return (
    <div className="admin-page">
      <h1>Modération des Actualités</h1>
      {posts.length === 0 && <p>Aucun post en attente.</p>}
      <div className="admin-grid">
        {posts.map(post => (
          <div key={post._id} className="admin-card">
            {post.image && <img src={post.image} alt={post.title} />}
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="admin-actions">
              <button onClick={() => handleStatus(post._id, 'approved')}>
                Approuver
              </button>
              <button onClick={() => handleStatus(post._id, 'rejected')}>
                Rejeter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
