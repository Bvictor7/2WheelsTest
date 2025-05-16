import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Chargement…</p>;
  if (!post) return <p className="not-found">Article non trouvé.</p>;

  return (
    <div className="detail-page">
      <Link to="/news" className="back-link">← Retour aux actualités</Link>
      {post.image && (
        <img src={post.image} alt={post.title} className="detail-image" />
      )}
      <h1 className="detail-title">{post.title}</h1>
      <div className="detail-meta">
        <span>Par <strong>{post.author}</strong></span>
        <span>• {new Date(post.createdAt).toLocaleDateString()}</span>
        <span>• Catégorie : {post.category}</span>
      </div>
      <p className="detail-description">{post.description}</p>
    </div>
  );
}
