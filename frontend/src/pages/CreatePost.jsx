import React, { useState } from 'react';
import axios from 'axios';
import './NewPost.css'; 

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Article soumis pour validation !');
      setTitle('');
      setDescription('');
      setImage(null);
      setCategory('');
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la publication.");
    }
  };

  return (
    <div className="newpost-page">
      <h1>Nouvel article</h1>
      <form className="newpost-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit">Publier</button>
      </form>
    </div>
  );
}

