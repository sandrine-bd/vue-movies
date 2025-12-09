<template>
    <div class="movies-list">
        <h1>Liste des films</h1>
        <div class="search-bar">
            <input type="text" v-model="search" placeholder="Rechercher un film..." @keyup.enter="fetchMovies" />
            <button @click="fetchMovies">Rechercher</button>
    </div>
    
    <div class="movies-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <router-link :to="`/movie/${movie.id}`">
                <img :src="movie.poster" :alt="movie.title" class="poster" />
                <h3>{{ movie.title }}</h3>
            </router-link>
            <RatingStars :rating="movie.userRating || movie.averageRating" @update:rating="val => updateRating(movie.id, val)" />
            </div>
        </div>
            
        <Pagination
        :total-items="totalItems"
        :page-size="itemsPerPage"
        :current-page="currentPage"
        @update:currentPage="page => { currentPage = page; fetchMovies() }"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'
    import api from '@/api/axios'
    import Pagination from '@/components/Pagination.vue'
    import RatingStars from '@/components/RatingStars.vue'

    const movies = ref([])
    const page = ref(1)
    const itemsPerPage = 12
    const totalItems = ref(0)
    const title = ref("")
    const search = ref('')
    const currentPage = ref(1)

    const fetchMovies = async () => {
        const response = await api.get("/movies", {
            params: {
                page: page.value,
                itemsPerPage,
                title: title.value || undefined
            }
        })

        movies.value = response.data["hydra:member"]
        totalItems.value = response.data["hydra:totalItems"]
    };

    watch([page, title], fetchMovies)
    onMounted(fetchMovies)
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
