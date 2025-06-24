import React, { useEffect, useState } from 'react';
import API from '../services/api';
import './AdminPanel.css';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const [userRes, postRes, commentRes] = await Promise.all([
        API.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        API.get('/posts/admin',   { headers: { Authorization: `Bearer ${token}` } }),
        API.get('/admin/comments',{ headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setUsers(userRes.data);
      setPosts(postRes.data);
      setComments(commentRes.data);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (type, id) => {
    try {
      await API.delete(`/admin/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch {
      // silent
    }
  };

  return (
    <div className="page-container">
      <div className="admin-panel">
        <h1>Panel Admin</h1>

        <section>
          <h2>Utilisateurs</h2>
          <ul>
            {users.map(u => (
              <li key={u._id}>
                <span>{u.name} ({u.email})</span>
                <button onClick={() => handleDelete('users', u._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Articles</h2>
          <ul>
            {posts.map(p => (
              <li key={p._id}>
                <span>{p.title}</span>
                <button onClick={() => handleDelete('posts', p._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}


