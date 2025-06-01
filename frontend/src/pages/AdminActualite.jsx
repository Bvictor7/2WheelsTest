import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminActualite.css';

export default function AdminActualite() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('pending');

  const token = localStorage.getItem('token');

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts/admin', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const filtered = res.data.filter(post => post.status === filter);
      setPosts(filtered);
    })
    .catch(console.error);
  };

  useEffect(fetchPosts, [filter]);

  const updatePostStatus = (id, status) => {
    axios.patch(`http://localhost:5000/api/posts/admin/${id}/status`,
      { status, approved: status === 'approved' },
      { headers: { Authorization: `Bearer ${token}` }}
    )
    .then(fetchPosts)
    .catch(console.error);
  };

  return (
    <div className="page-container">
      <div className="admin-page">
        <h1>Modération des Actualités</h1>

        <div className="admin-filters">
          <button onClick={() => setFilter('pending')}>En attente</button>
          <button onClick={() => setFilter('approved')}>Approuvés</button>
          <button onClick={() => setFilter('rejected')}>Rejetés</button>
        </div>

        {posts.length === 0 ? (
          <p>Aucun post trouvé pour ce statut.</p>
        ) : (
          <div className="admin-grid">
            {posts.map(post => (
              <div key={post._id} className="admin-card">
                {post.image && <img src={post.image} alt={post.title} />}
                <h3>{post.title}</h3>
                <p>{post.description.slice(0, 150)}…</p>
                <div className="admin-actions">
                  <button onClick={() => updatePostStatus(post._id, 'approved')}>Approuver</button>
                  <button onClick={() => updatePostStatus(post._id, 'rejected')}>Rejeter</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

