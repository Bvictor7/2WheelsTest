// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderMain from './components/HeaderMain';
import Home from './pages/Home';
import Login from './pages/Login';
import News from './pages/News';
import AdminActualite from './pages/AdminActualite';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ArticleDetail from './pages/ArticleDetail';
import EditPost from './pages/EditPost';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <HeaderMain />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route path="/posts/:id" element={<ArticleDetail />} />

        {/* Admin-only: modération des actualités */}
        <Route
          path="/admin/actualite"
          element={
            <AdminRoute>
              <AdminActualite />
            </AdminRoute>
          }
        />

        {/* Authenticated user routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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

        {/* 404 */}
        <Route path="*" element={<p>Page non trouvée</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
