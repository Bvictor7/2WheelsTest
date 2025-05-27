import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewPost.css';

export default function NewPost() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    author: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImageFile(files[0]);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('category', form.category);
    data.append('author', form.author);
    if (imageFile) data.append('image', imageFile);

    axios.post('http://localhost:5000/api/posts', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      alert('Post créé et en attente de validation.');
      navigate('/dashboard');
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || 'Erreur de création');
    });
  };

  return (
    <div className="newpost-page">
      <h1>Nouvel article</h1>
      <form className="newpost-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Catégorie"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Auteur"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
