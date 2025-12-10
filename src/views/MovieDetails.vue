<template>
    <div class="movie-details" v-if="movie">
        <h1>{{ movie.title }}</h1>
        <img :src="movie.poster" alt="movie.title" class="poster" />
        <p>{{ movie.description }}</p>
        <p><strong>Genres:</strong> {{ movie.genres.map(g => g.name).join(', ') }}</p>
        <p><strong>Réalisateur:</strong> {{ movie.director?.name || 'N/A' }}</p>
        <p><strong>Acteurs:</strong> {{ movie.casts.map(c => c.name).join(', ') }}</p>
        
        <!-- Notation de l'utilisateur -->
        <RatingStars :rating="userRating" @update:rating="updateRating" />

        <!-- Critiques -->
        <h2>Critiques</h2>
        <div v-if="reviews.length">
            <ReviewCard v-for="r in reviews" :key="r.id" :review="r" :showActions="true" @like="handleLike" />
        </div>
        <div v-else>Aucune critique pour le moment.</div>
        
        <!-- Ajouter critique -->
        <div v-if="authStore.user">
            <ReviewForm :movieId="movie.id" :userId="authStore.user.id" @submitted="newReview => reviews.unshift(newReview)" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import api from '@/api/axios'
import RatingStars from '@/components/RatingStars.vue'
import ReviewCard from '@/components/ReviewCard.vue'

const route = useRoute()
const authStore = useAuthStore()

const movie = ref(null)
const userRating = ref(0)
const reviews = ref([])
const newReview = ref('')

// Charger le film et ses données
const fetchMovie = async () => {
    const movieId = route.params.id
    const res = await api.get(`/movies/${movieId}`)
    movie.value = res.data
        
    // Charger les notes de l'utilisateur si connecté
    if (authStore.user) {
        const ratingRes = await api.get(`/movies/${movieId}/ratings`)
        const userRatingObj = ratingRes.data['hydra:member'].find(r => r.user.id === authStore.user.id)
        userRating.value = userRatingObj ? userRatingObj.rating : 0
    }
        
    // Charger les critiques
    const reviewsRes = await api.get(`/movies/${movieId}/reviews`)
    reviews.value = reviewsRes.data['hydra:member'] || []
}
    
// Noter le film
const updateRating = async (val) => {
    const movieId = route.params.id
    await api.post('/ratings', { movie: movieId, rating: val })
    userRating.value = val
}
// Publier une critique
const submitReview = async () => {
    if (!newReview.value) return
    const movieId = route.params.id
    const res = await api.post('/reviews', {
        movie: movieId,
        content: newReview.value
    })
    reviews.value.push(res.data)
    newReview.value = ''
}

onMounted(fetchMovie)
</script>

<style>
.poster {
  max-width: 200px;
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  min-height: 80px;
  margin-bottom: 0.5rem;
}
</style>