import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

export default function PostForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    author: 'Victor'
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = e => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('author', formData.author);
    if (imageFile) data.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/api/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ title: '', description: '', category: '', author: 'Victor' });
      setImageFile(null);
      alert('Post créé !');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création.');
    }
  };

  return (
    <div className="page-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h2>Nouveau Post</h2>
        <input
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <input
          name="category"
          placeholder="Catégorie"
          value={formData.category}
          onChange={handleChange}
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
