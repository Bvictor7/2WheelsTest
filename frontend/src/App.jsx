// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import News from './pages/News';
import Dashboard from './pages/Dashboard';
import Profile from "./pages/Profile.jsx";
import ArticleDetail from './pages/ArticleDetail';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/news" element={<News />} />

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

        <Route path="/posts/:id" element={<ArticleDetail />} />

        {/* 404 */}
        <Route path="*" element={<p>Page non trouvée</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

