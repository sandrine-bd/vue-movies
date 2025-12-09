// src/store/movies.js
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
    async fetchMovies({ page = 1, itemsPerPage = 12, title, genreId } = {}) {
      try {
        const params = {
          page,
          itemsPerPage
        }

        if (title) params.title = title
        if (genreId) params.genre = genreId

        const response = await api.get('/movies', { params })
        console.log('Réponse API :', response.data)

        // Mise à jour du store
        this.movies = response.data['hydra:member'] || []
        this.totalItems = response.data['hydra:totalItems'] || 0
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
