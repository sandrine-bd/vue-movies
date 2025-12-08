import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // URL de l'API Symfony
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use(config => {
    if(config.method === 'patch') {
        config.headers['Content-Type'] = 'application/merge-patch+json';
    } return config;
    }, error => {
        return Promise.reject(error);
});

export default api