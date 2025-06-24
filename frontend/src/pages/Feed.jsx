import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <p><strong>{post.userId?.username || "Utilisateur"}</strong></p>
          <p>{post.content}</p>
          <p style={{ fontSize: "0.8em", color: "#666" }}>
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
