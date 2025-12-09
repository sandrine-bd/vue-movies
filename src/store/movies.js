import { defineStore } from 'pinia'
import api from '@/api/axios'
import { ref } from 'vue'

export const useMovieStore = defineStore('movies', () => {
    const movies = ref([])
    const totalItems = ref(0)

    const fetchMovies = async ({page = 1, itemsPerPage = 12, title, genreId, actorId, directorId } = {}) => {
        const params = { page, itemsPerPage }
        if (title) params.title = title
        if (genreId) params.genre = genreId
        if (actorId) params.actor = actorId
        if (directorId) params.director = directorId

        const res = await api.get('/movies', { params })
        movies.value = res.data['hydra:member']
        totalItems.value = res.data['hydra:totalItems']
    }

    return { movies, totalItems, fetchMovies }
})