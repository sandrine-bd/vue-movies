import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useAuthStore = defineStore('userAuth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user
    },

    actions: {
         // Connexion : email + mot de passe - Réponse attendue de l'API : token: "XXX", user: { id, username, email }
        async login(credentials) {
            try {
                const response = await api.post('/auth', credentials)
                this.token = response.data.token
                this.user = response.data.user

                // Sauvegarde
                localStorage.setItem('token', this.token)
                localStorage.setItem('user', JSON.stringify(this.user))

                // Configure axios pour les futures requêtes
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return true

            } catch (error) {
                console.error('Erreur de connexion', error)
                return false
            }
        },

        async register(data) {
            try {
                const res = await api.post('/users', data)
                return res.data
            } catch (error) {
                console.log("Erreur d'inscription :", error.response?.data || error)
                throw error
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
            if (this.user) {
                console.log('User restauré :', this.user)
            }
        }
    }
})
