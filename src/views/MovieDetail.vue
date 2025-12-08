<script setup lang="ts">
import RatingStars from '../components/RatingStars.vue';

</script>

// Informations complètes + reviews + noter le film

<template>
    <div class="movie-detail">
        <div class="header">
            <img :src="movie.poster" alt="Poster" class="poster" />
            <div class="info">
                <h1>{{ movie.title }}</h1>
                <p><strong>Genre : </strong> {{ movie.genre }}</p>
                <p><strong>Réalisateur : </strong> {{ movie.director }}</p>
                <p><strong>Acteurs : </strong> {{ movie.actors.join(', ') }}</p>
            </div>

            <div class="rating">
                <span>Votre note :</span>
                <RatingStars :rating="userRating" @update:rating="updateRating" />
            </div>

            <div class="collections">
                <label>Ajouter à une collection :</label>
                <select v-model="selectedCollection">
                    <option v-for="col in collections" :key="col.id" :value="col.id">{{ col.name }}</option>
                </select>
                <button @click="addToCollection">Ajouter</button>
            </div>
        </div>

        <div class="reviews">
            <h2>Critiques</h2>
            <div v-for="review in reviews" :key="review.id" class="review-card">
                <strong>{{ review.user.username }}</strong>
                <RatingStars :rating="review.rating" />
                <p>{{ review.comment }}</p>
            </div>

            <div v-if="isLoggedIn" class="new-review">
                <h3>Écrire une critique</h3>
                <textarea v-model:"newComment" placeholder="Votre critique..."></textarea>
                <RatingStars :rating="newRating" @update:rating="val => newRating = val" />
                <button @click="submitReview">Envoyer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { api } from '@/api/axios'
    import RatingStars from '@/components/RatingStars.vue'

    const route = useRoute()
    const movie = ref({})
    const reviews = ref([])
    const userRating = ref(0)
    const newComment = ref('')
    const newRating = ref(0)
    const collections = ref([])
    const selectedCollection = ref(null)
    const isLoggedIn = ref(true) // remplacer par logique d'authentification

    const fetchMovie = async () => {
        const res = await api.get(`/api/movies/${route.params.id}`)
        movie.value = res.data
        userRating.value = res.data.userRating || 0
    }

    const fetchReviews = async () => {
        const res = await api.get(`/api/movies/${route.params.id}/reviews`)
        reviews.value = res.data
    }

    const fetchCollections = async () => {
        const res = await api.get(`/api/users/me/collections`)
        collections.value = res.data
    }

    const updateRating = async () => {
        await api.patch(`/api/movies/${movie.value.id}/rating`, { rating })
        userRating.value = rating
    }

    const submitReview = async () => {
        if (!newComment.value || newRating.value === 0) return
        await api.post(`/api/movies/${movie.value.id}/reviews`, {
            comment: newComment.value,
            rating: newRating.value,
        })
        newComment.value = ''
        newRating.value = 0
        fetchReviews()
    }

    const addToCollection = async () => {
        if (!selectedCollection.value) return
        await api.post(`/api/collections/${selectedCollection.value}/movies`, {
            movieId: movie.value.id,
        })
        alert('Film ajouté à la collection !')
    }

    onMounted(() => {
        fetchMovie()
        fetchReviews()
        fetchCollections()
    })
</script>

<style>
    .movie-detail {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
    }

    .header {
        display: flex;
        gap: 1rem;
    }

    .poster {
        width: 200px;
        border-radius: 5px;
    }

    .info {
        flex: 1;
    }

    .collections {
        margin-top: 1rem;
    }

    .reviews {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .review-card {
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 5px;
    }

    .new-review textarea {
        width: 100%;
        min-height: 80px;
        margin-bottom: 0.5rem;
    }
</style>