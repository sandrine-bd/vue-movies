<template>
    <div class="movie-details" v-if="movie">
        <h1>{{ movie.title }}</h1>
        <img :src="movie.poster" alt="movie.title" class="poster" />

        <div class="movie-info">
            <p><strong>Année :</strong> {{ movie.year }}</p>
            <p v-if="movie.plot"><strong>Synopsis :</strong> {{ movie.plot }}</p>

            <p v-if="movie.genres?.length">
                <strong>Genre(s) :</strong> {{ movie.genres.map(g => g.label).join(', ') }}
            </p>

            <p v-if="movie.directors?.length">
                <strong>Réalisateur(s) :</strong> {{ movie.directors.map(d => d.fullName).join(', ') }}
            </p>

            <p v-if="movie.castMembers?.length">
                <strong>Acteurs :</strong> {{ movie.castMembers.map(c => c.fullName).join(', ') }}
            </p>

            <p v-if="movie.countries?.length">
                <strong>Pays :</strong> {{ movie.countries.join(', ') }}
            </p>

            <div v-if="movie.imdb?.rating" class="ratings">
                <p><strong>IMDB :</strong> {{ movie.imdb.rating }}/10 ({{ movie.imdb.votes }} votes)</p>
            </div>
        </div>
        
        <!-- Notation de l'utilisateur -->
        <div class="user-rating">
            <h3>Votre note</h3>
            <RatingStars :rating="userRating" @update:rating="updateRating" />
        </div>

        <!-- Critiques -->
        <div class="reviews-section">
            <h2>Critiques</h2>
            <div v-if="reviews.length">
                <ReviewCard 
                    v-for="r in reviews" 
                    :key="r.id" 
                    :review="r" 
                    :show-actions="true" 
                    @like="handleLike" 
                />
            </div>
            <div v-else>Aucune critique pour le moment.</div>
        </div>
        
        <!-- Ajouter critique -->
        <div v-if="authStore.isAuthenticated">
            <ReviewForm 
                :movie-id="movie.id" 
                :user-id="authStore.user.id" 
                @submitted="newReview => reviews.unshift(newReview)" 
            />
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
import ReviewForm from '@/components/ReviewForm.vue'

const route = useRoute()
const authStore = useAuthStore()

const movie = ref(null)
const userRating = ref(0)
const reviews = ref([])

// Charger le film et ses données
const fetchMovie = async () => {
    try {
        const movieId = route.params.id
        const res = await api.get(`/movies/${movieId}`)
        movie.value = res.data
        
        // Charger les notes de l'utilisateur si connecté
        if (authStore.isAuthenticated) {
            const ratingRes = await api.get(`/movies/${movieId}/ratings`)
            const userRatingObj = ratingRes.data.member?.find(
                r => r.user.id === authStore.user.id
            )
            userRating.value = userRatingObj ? userRatingObj.rating : 0
        }
        
        // Charger les critiques
        const reviewsRes = await api.get(`/movies/${movieId}/reviews`)
        reviews.value = reviewsRes.data.member || []
    } catch (error) {
        console.error('Erreur lors du chargement du film:', error)
    }
}
    
// Noter le film
const updateRating = async (val) => {
    if (!authStore.isAuthenticated) {
        alert('Vous devez être connecté pour noter un film')
        return
    }

    try {
        const movieId = route.params.id
        await api.post('/ratings', { 
            movie: `/api/movies/${movieId}`,
            rating: val 
        })
        userRating.value = val
    } catch (error) {
        console.error('Erreur lors de la notation:', error)
    }
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
.movie-details {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.poster {
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.movie-info {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.movie-info p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.full-plot {
  margin-top: 1rem;
  font-style: italic;
  color: #666;
}

.ratings {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.user-rating {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.reviews-section {
  margin-top: 2rem;
}

h2, h3 {
  margin-bottom: 1rem;
}
</style>