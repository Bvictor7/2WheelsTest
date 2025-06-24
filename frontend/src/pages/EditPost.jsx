import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '@services/api';
import './EditPost.css';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    imageFile: null
  });

  useEffect(() => {
    API.get(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const { title, description, category, author } = res.data;
        setForm(f => ({ ...f, title, description, category, author }));
      })
      .catch(() => {});
  }, [id, token]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm(f => ({ ...f, imageFile: files[0] }));
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
    if (form.imageFile) data.append('image', form.imageFile);

    API.put(`/posts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => navigate('/dashboard'))
      .catch(() => {});
  };

  return (
    <div className="edit-page">
      <h1>Modifier mon post</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
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
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
