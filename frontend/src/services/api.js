const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('🔍 build-time VITE_API_BASE_URL =', baseURL);

if (!baseURL) {
  throw new Error(
    `VITE_API_BASE_URL is ${baseURL}. Check your Vercel environment variable configuration.`
  );
}

import axios from 'axios';
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
