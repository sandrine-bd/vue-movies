<template>
    <div class="movie-card">
        <router-link :to="`/movies/${movie.id}`">
            <img :src="movie.poster" :alt="movie.title" />
            <h3>{{ movie.title }}</h3>
        </router-link>
        <RatingStars :rating="movie.userRating || movie.averageRating" @update:rating="val => updateRating(movie.id, val)" />
    </div>
</template>

<script setup>
import RatingStars from './RatingStars.vue'
import api from '@/api/axios'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const props = defineProps({
    movie: Object
})

const updateRating = async (movieId, rating) => {
    if (!authStore.isAuthenticated) {
        alert('Vous devez être connecté pour noter un film')
        return
    }
    
    try {
        await api.post('/ratings', { 
            movie: `/api/movies/${movieId}`,
            rating: rating
        })
    } catch (error) {
        console.error('Erreur notation :', error)
    }
}
</script>
