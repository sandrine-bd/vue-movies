import axios from 'axios' // crée une seule instance axios 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // URL de base définie par variable d'environnement Vite
  headers: {
    'Content-Type': 'application/json', // adapté aux requêtes PATCH
  }
})

// Intercepteur pour injecter automatiquement le token JWT si l'utilisateur est connecté
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api