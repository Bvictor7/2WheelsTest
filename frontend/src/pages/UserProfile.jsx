import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUser(res.data.user);
        setPosts(res.data.posts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="profile-loading">Chargement du profil…</p>;
  if (!user) return <p className="profile-error">Utilisateur non trouvé.</p>;

  return (
    <div className="public-profile">
      <h1>Profil public de {user.name}</h1>

      {posts.length === 0 ? (
        <p>Aucun article publié.</p>
      ) : (
        <div className="public-posts">
          {posts.map(post => (
            <div key={post._id} className="public-post-card">
              {post.image && (
                <img src={post.image} alt={post.title} className="public-post-img" />
              )}
              <div>
                <h3>{post.title}</h3>
                <p>{post.description.slice(0, 100)}…</p>
                <Link to={`/posts/${post._id}`} className="read-more">Lire la suite</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
