// src/pages/News.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function News() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then(res => setPosts(res.data));
  }, []);
  return (
    <div className="news-page">
      <h1>Actualités</h1>
      {posts.map(p => (
        <div key={p._id}>
          <a href={`/posts/${p._id}`}>{p.title}</a>
        </div>
      ))}
    </div>
  );
}
