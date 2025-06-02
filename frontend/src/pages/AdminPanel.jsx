import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  // 🔄 Récupération des données
  const fetchData = async () => {
    try {
      const [userRes, postRes, commentRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/admin/posts', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/admin/comments', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setUsers(userRes.data);
      setPosts(postRes.data);
      setComments(commentRes.data);
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des données admin:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔘 Suppression
  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(`❌ Erreur lors de la suppression de ${type}:`, err);
    }
  };

  return (
    <div className="page-container">
      <div className="admin-panel">
        <h1>Panel Admin</h1>

        <section>
          <h2>Utilisateurs</h2>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                {user.name} ({user.email})
                <button onClick={() => handleDelete('users', user._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Articles</h2>
          <ul>
            {posts.map(post => (
              <li key={post._id}>
                {post.title} - {post.status}
                <button onClick={() => handleDelete('posts', post._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Commentaires</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment._id}>
                {comment.content}
                <button onClick={() => handleDelete('comments', comment._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}


