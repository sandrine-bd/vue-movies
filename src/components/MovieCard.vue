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

const props = defineProps({
    movie: Object
})

const updateRating = async (movieId, rating) => {
    await api.post('/ratings', { movie: movieId, rating })
}
</script>
