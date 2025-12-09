import { defineStore } from 'pinia'
import { api } from '@/api/axios'

export const useAuthStore = defineStore('userAuth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
         // Connexion : email + mot de passe - Réponse attendue de l'API : token: "XXX", user: { id, username, email }
        async login(credentials) {
            try {
                const response = await api.post('/login', credentials)
                this.token = response.data.token
                this.user = response.data.user
                localStorage.setItem('token', this.token)
                localStorage.setItem('user', JSON.stringify(this.user))
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return true
            } catch (error) {
                console.error('Erreur de connexion', error)
                return false
            }
        },
        // Déconnexion : supprime tout 
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
        },
        // Recharge les données au cas où Axios perdrait le token 
        init() {
            if (this.token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            }
        }
    }
})
