import { useEffect, useState } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <p><strong>{post.userId?.username || "Utilisateur"}</strong></p>
          <p>{post.content}</p>
          <p style={{ fontSize: "0.8em", color: "#666" }}>{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
