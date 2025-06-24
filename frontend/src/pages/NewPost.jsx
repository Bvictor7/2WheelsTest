import React, { useState } from 'react';
import API from '../services/api';
import './CreatePost.css';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', category.trim());
    if (image) formData.append('image', image);

    try {
      setIsSubmitting(true);

      await API.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Article soumis pour validation !');
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
    } catch {
      alert("Une erreur est survenue lors de la publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="newpost-page">
        <h1>Nouvel article</h1>
        <form className="newpost-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publication en cours…' : 'Publier'}
          </button>
        </form>
      </div>
    </div>
  );
}

