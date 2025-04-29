import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
export const login = (creds) => API.post('/auth/login', creds);
export const register = (data) => API.post('/auth/register', data);
export const fetchMe = (token) =>
  API.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });
