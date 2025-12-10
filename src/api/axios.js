import axios from 'axios' // crée une seule instance axios 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // URL de base définie par variable d'environnement Vite
  headers: {
    'Content-Type': 'application/json', // adapté aux requêtes PATCH
  }
})

// Intercepteur pour injecter automatiquement le token JWT si l'utilisateur est connecté
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs 401 (token expiré)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api