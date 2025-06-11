import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './News.css';

export default function News() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:5000/api/posts')
    .then(res => {
      console.log("Articles bruts reçus : ", res.data); 
      const uniqueApprovedPosts = Array.from(
        new Map(res.data
          .filter(p => p.approved === true)
          .map(p => [p._id, p]))
      ).map(entry => entry[1]);

      setPosts(uniqueApprovedPosts);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="page-container">
      <div className="news-page">
        <h1>Actualités</h1>
        <div className="news-list">
          {posts.map(post => (
            <div key={post._id} className="news-card">
              <Link to={`/article/${post._id}`}>
                <img src={post.image} alt={post.title} className="news-image" />
              </Link>
              <div className="news-content">
                <h2>{post.title}</h2>
                <p>{post.description.slice(0, 100)}...</p>
                <p className="news-meta">
                  Par <strong>{post.author?.name || 'Utilisateur supprimé'}</strong> – {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link to={`/article/${post._id}`} className="read-more">Lire l'article</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
