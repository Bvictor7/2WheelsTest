import React from 'react';
import './CV.css';

export default function CV() {
  return (
    <div className="cv-container">
      <div className="cv-wrapper">
        <header className="cv-header">
          <h1 className="cv-name">VICTOR BELAHCENE</h1>
          <p className="cv-title">Full-Stack Developer (MERN)</p>
          <div className="cv-contact">
            <p className="cv-location">EU Citizen (France)</p>
            <div className="cv-links">
              <a href="mailto:belahcene2@gmail.com" className="cv-link">
                📧 belahcene2@gmail.com
              </a>
              <a href="tel:+33771591962" className="cv-link">
                📞 +33 7 71 59 19 62
              </a>
              <a href="https://github.com/Bvictor7" target="_blank" rel="noopener noreferrer" className="cv-link">
                GitHub: github.com/Bvictor7
              </a>
              <a href="https://portfolio-belahcenes-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="cv-link">
                Portfolio: portfolio-belahcenes-projects.vercel.app
              </a>
            </div>
          </div>
        </header>

        <section className="cv-section">
          <h2 className="cv-section-title">PROFILE</h2>
          <p className="cv-text">
            Full-stack developer specialized in <strong>JavaScript / MERN stack</strong>, experienced in building and deploying production-ready web applications. Strong focus on clean architecture, secure APIs, and real-world usability. Comfortable in English-speaking, international environments.
          </p>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">CORE PROJECT</h2>
          <div className="cv-project">
            <h3 className="cv-project-title">2WHEELS – Community Platform for Motorcyclists</h3>
            <p className="cv-project-subtitle">Full-stack MERN application deployed in production.</p>
            <ul className="cv-list">
              <li>JWT authentication, role-based access (user/admin)</li>
              <li>Posts, likes, comments, image uploads</li>
              <li>Admin dashboard for moderation</li>
              <li>Cloud deployment (frontend & backend)</li>
            </ul>
            <p className="cv-tech-stack">
              <strong>Stack:</strong> React, Node.js, Express, MongoDB, JWT, Cloudinary, Vercel, Render
            </p>
            <div className="cv-project-links">
              <a href="https://github.com/Bvictor7/2Wheels-test" target="_blank" rel="noopener noreferrer" className="cv-project-link">
                Code: github.com/Bvictor7/2Wheels-test
              </a>
              <a href="https://2-wheels-test.vercel.app" target="_blank" rel="noopener noreferrer" className="cv-project-link">
                Demo: 2-wheels-test.vercel.app
              </a>
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">TECHNICAL SKILLS</h2>
          <div className="cv-skills">
            <div className="cv-skill-category">
              <strong>Frontend:</strong> JavaScript (ES6+), React, HTML5, CSS3, Tailwind, Bootstrap
            </div>
            <div className="cv-skill-category">
              <strong>Backend:</strong> Node.js, Express.js, REST APIs, JWT
            </div>
            <div className="cv-skill-category">
              <strong>Databases:</strong> MongoDB, MySQL (basic)
            </div>
            <div className="cv-skill-category">
              <strong>Tools:</strong> Git, GitHub, Postman, Figma
            </div>
            <div className="cv-skill-category">
              <strong>CMS:</strong> WordPress, WooCommerce
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">EXPERIENCE</h2>
          <div className="cv-experience">
            <div className="cv-experience-item">
              <div className="cv-experience-header">
                <h3 className="cv-experience-title">Web & Mobile Developer (CDA – Work-Study / Internship)</h3>
                <span className="cv-experience-company">AFEC Bayonne</span>
                <span className="cv-experience-date">2024–2025</span>
              </div>
              <ul className="cv-list">
                <li>Built and deployed MERN applications with secure REST APIs</li>
                <li>Worked on database design, authentication, and production maintenance</li>
              </ul>
            </div>
            <div className="cv-experience-item">
              <div className="cv-experience-header">
                <h3 className="cv-experience-title">Digital Entrepreneur (Training)</h3>
                <span className="cv-experience-company">Simplon</span>
                <span className="cv-experience-date">03/2024–05/2024</span>
              </div>
              <ul className="cv-list">
                <li>Delivered WordPress websites and WooCommerce solutions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">EDUCATION</h2>
          <div className="cv-education">
            <div className="cv-education-item">
              <h3 className="cv-education-title">Concepteur Développeur d'Applications (CDA)</h3>
              <p className="cv-education-detail">Level 6 (Bachelor equiv.) | 2024–2025</p>
            </div>
            <div className="cv-education-item">
              <h3 className="cv-education-title">BTS Digital Negotiation & Customer Relationship</h3>
              <p className="cv-education-detail">2021–2022</p>
            </div>
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">LANGUAGES</h2>
          <p className="cv-text">French (Native) • English (B2) • Spanish (Basic)</p>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">INTERESTS</h2>
          <p className="cv-text">Motorcycles • Software Development • Tech Watch</p>
        </section>
      </div>
    </div>
  );
}



