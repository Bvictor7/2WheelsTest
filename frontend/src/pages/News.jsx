import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './News.css';

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts') // ne renvoie que status: 'approved'
      .then(res => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="news-loading">Chargement des actualités…</p>;
  if (!posts.length) return <p className="news-empty">Aucune actualité pour le moment.</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600,  settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="news-page">
      <h1>Actualités</h1>
      <Slider {...settings}>
        {posts.map(post => (
          <div key={post._id} className="news-card">
            {post.image && (
              <img src={post.image} alt={post.title} className="news-img" />
            )}
            <h3>{post.title}</h3>
            <p>{post.description.slice(0, 100)}…</p>
            <Link to={`/posts/${post._id}`} className="news-link">
              Lire la suite
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
