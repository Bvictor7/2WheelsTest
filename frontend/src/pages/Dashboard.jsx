import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPosts(res.data))
    .catch(console.error);
  };

  useEffect(fetchPosts, []);

  const handleDelete = id => {
    if (!window.confirm('Supprimer ce post ?')) return;
    axios.delete(`http://localhost:5000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchPosts())
    .catch(console.error);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Mon Dashboard</h1>
        <Link className="create-btn" to="/new">+ Nouvel article</Link>
      </div>

      {posts.length === 0 ? (
        <p className="empty">Vous n'avez pas encore de posts.</p>
      ) : (
        <div className="dashboard-grid">
          {posts.map(post => (
            <div key={post._id} className="dashboard-card">
              {post.image && <img src={post.image} alt={post.title} />}
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="actions">
                <Link to={`/edit/${post._id}`} className="edit-btn">Modifier</Link>
                <button onClick={() => handleDelete(post._id)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

