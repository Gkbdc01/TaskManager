import axios from 'axios';

// 1. Set up the Base URL dynamically
// Locally, it will fall back to localhost:5000. 
// When you deploy, it will automatically pull your live URL from your environment variables.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor
// This interceptor pauses every request right before it leaves the browser,
// grabs the latest token from localStorage, and injects it into the Authorization header.
// Inside your src/utils/api.js request interceptor line:
api.interceptors.request.use(
  (config) => {
    // 🔄 SWAPPED: Fetch from sessionStorage
    const token = sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;