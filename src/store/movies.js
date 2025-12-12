import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],           // Liste des films
    totalItems: 0,        // Nombre total de films pour la pagination
    currentPage: 1,       // Page courante
    itemsPerPage: 12      // Nombre d'items par page
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage) || 1
  },

  actions: {
    async fetchMovies({ page = 1, itemsPerPage = 12, title, genreId, actorId, directorId } = {}) {
      try {
        let response

        if (genreId) {
          response = await api.get(`/genres/${genreId}/movies`, {
            params: { page, itemsPerPage }
          })
        } else if (actorId) {
          response = await api.get(`/casts/${actorId}/movies`, {
            params: { page, itemsPerPage }
          })
        } else if (directorId) {
          response = await api.get(`/directors/${directorId}/movies`, {
            params: { page, itemsPerPage }
          })
        } else {
          // Recherche générale avec titre
          const params = { page, itemsPerPage }
          if (title) params.title = title
          response = await api.get('/movies', { params })
        }

        // Mise à jour du store
        this.movies = response.data.member || []
        this.totalItems = response.data.totalItems || 0
        this.currentPage = page
        this.itemsPerPage = itemsPerPage
      } catch (error) {
        console.error('Erreur lors du fetch des films :', error)
        this.movies = []
        this.totalItems = 0
      }
    },

    // Méthode pour changer la page depuis la pagination
    setPage(page) {
      this.currentPage = page
      this.fetchMovies({ page, itemsPerPage: this.itemsPerPage })
    }
  }
})
