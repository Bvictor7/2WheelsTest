// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArticleDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Chargement de l’article…</p>;
  return (
    <div className="article-page">
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} />}
      <p>{post.description}</p>
      <small>Catégorie : {post.category}</small>
    </div>
  );
}
