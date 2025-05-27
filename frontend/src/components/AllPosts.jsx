import { useEffect, useState } from 'react';
import axios from 'axios';

function AllPosts({ token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts/admin', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPosts(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/api/posts/admin/${id}/status`, { approved: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.map(post => post._id === id ? { ...post, approved: true } : post));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Tous les posts</h2>
      {posts.map(post => (
        <div key={post._id} style={{ border: "1px solid #ccc", padding: "1em", margin: "1em 0" }}>
          {post.image && <img src={post.image} alt={post.title} width="200" />}
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p><strong>Catégorie :</strong> {post.category}</p>
          <p><strong>Auteur :</strong> {post.author}</p>
          <p><strong>Status :</strong> {post.approved ? "Approuvé" : "En attente"}</p>
          {!post.approved && <button onClick={() => handleApprove(post._id)}>Approuver</button>}
          <button onClick={() => handleDelete(post._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default AllPosts;
