import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const featured = posts
    .slice()
    .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))[0];

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero-section">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Actualité */}
      <section className="actualite-section">
        <h2>Actualité</h2>
        <Slider {...carouselSettings}>
          {posts.map(post => (
            <div key={post._id} className="carousel-item">
              {post.image && <img src={post.image} alt={post.title} />}
            </div>
          ))}
        </Slider>
      </section>

      {/* Nouveauté */}
      {featured && (
        <section className="nouveaute-section">
          <h2>Nouveauté</h2>
          <div className="featured-card">
            {featured.image && <img src={featured.image} alt={featured.title} />}
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 2Wheels. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
