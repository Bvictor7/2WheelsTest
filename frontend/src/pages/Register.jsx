import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      return alert('Les mots de passe ne correspondent pas')
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message)
      }
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="page-container">
      <div className="register-page">
        <div className="register-card">
          <div className="register-header">
            <img src="/assets/logo.svg" alt="Logo" className="register-logo" />
            <h2>Inscription</h2>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <label>
              Nom
              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="utilisateur@exemple.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label>
              Mot de passe
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>
            <label>
              Confirmer le mot de passe
              <input
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                required
              />
            </label>
            <button type="submit" className="btn-register">S’inscrire</button>
          </form>
          <p className="login-link">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
