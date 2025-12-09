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
                <textarea v-model="newComment" placeholder="Votre critique..."></textarea>
                <RatingStars :rating="newRating" @update:rating="val => newRating = val" />
                <button @click="submitReview">Envoyer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import api from '@/api/axios'
    import RatingStars from '@/components/RatingStars.vue'
    
    const route = useRoute()
    const movie = ref(null)
    const ratings = ref([])
    const reviews = ref([])

    const fetchData = async () => {
        const id = route.params.id;
        movie.value = (await api.get(`/movies/${id}`)).data
        ratings.value = (await api.get(`/movies/${id}/ratings`)).data["hydra:member"]
        reviews.value = (await api.get(`/movies/${id}/reviews`)).data["hydra:member"]
    };

    onMounted(fetchData)
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