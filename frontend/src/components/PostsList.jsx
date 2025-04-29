// src/components/PostsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostsList.css';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Chargement…</p>;
  if (!posts.length) return <p className="no-posts">Aucun post.</p>;

  return (
    <div className="posts-list">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <div className="post-img-wrapper">
            {post.image
              ? <img src={post.image} alt={post.title} className="post-img" />
              : <div className="no-image">Pas d’image</div>
            }
          </div>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-desc">{post.description}</p>
          <small className="post-meta">
            Catégorie : {post.category} — par {post.author}
          </small>
        </div>
      ))}
    </div>
  );
}

