import axios from 'axios';

const API = axios.create({
  baseURL: 'https://twowheelstest.onrender.com'
});

export default API;
