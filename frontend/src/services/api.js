import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('build-time VITE_API_BASE_URL =', baseURL);

if (!baseURL) {
  throw new Error(
    `VITE_API_BASE_URL is ${baseURL}. Vérifie ta config d'env vars dans Vercel.`
  );
}

const API = axios.create({
  baseURL
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
