import axios from 'axios';
import API_URL from './Api_URL'


const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
);

export default api;
