import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '@services/api'
import './Register.css'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      return alert('Les mots de passe ne correspondent pas')
    }
    try {
      const { data } = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      })
      // Stocke le token et l'utilisateur en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      // Redirige vers la page protégée (par ex. dashboard)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || err.message)
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
              Nom complet
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
            <button type="submit" className="btn-register">
              S’inscrire
            </button>
          </form>
          <p className="login-link">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

