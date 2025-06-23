import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderMain from './components/HeaderMain'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import News from './pages/News'
import NewsAll from './pages/NewsAll'
import ArticleDetail from './pages/ArticleDetail'
import UserProfile from './pages/UserProfile'
import Dashboard from './pages/Dashboard'
import NewPost from './pages/NewPost'
import Profile from './pages/Profile'
import EditPost from './pages/EditPost'
import AdminActualite from './pages/AdminActualite'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <HeaderMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/nouveautes" element={<NewsAll />} />
        <Route path="/posts/:id" element={<ArticleDetail />} />
        <Route path="/users/:id" element={<UserProfile />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/actualite"
          element={
            <AdminRoute>
              <AdminActualite />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route path="*" element={<p>Page non trouvée</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

