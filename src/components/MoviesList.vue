<template>
    <div>
        <h1>Liste des films</h1>
        <input type="text" v-model="search" placeholder="Rechercher par titre..." @input="fetchMovies" />

        <div class="movies-grid">
            <div v-for="movie in movies" :key="movie.id" class="movie-card">
                <img :src="movie.poster" alt="" />
                <h2>{{ movie.title }}</h2>
                <RatingStars :rating="movie.rating" @update:rating="updateRating(movie.id, $event)" />
                <router-link :to="`/movie/${movie.id}`">Voir détails</router-link>
            </div>
        </div>

        <Pagination :total-items="movies.length" :page-size="10" :current-page="currentPage" @change="currentPage = $event" />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { api } from '@api/axios'
    import Pagination from '@/components/Pagination.vue'
    import RatingStars from '@/components/RatingStars.vue'

    const movies = ref([])
    const search = ref('')
    const currentPage = ref(1)

    const fetchMovies = async () => {
        const res = await api.get('/api/movies', { params: { search: search.value } })
        movies.value = res.data
    }

    const updateRating = async (id, rating) => {
        await api.patch(`/api/movies/${id}/rating`, { rating })
        fetchMovies()
    }

    fetchMovies()
</script>

<style>
    .movies-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }

    .movie-card {
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 5px;
    }
</style>
