<template>
    <div class="movies-list">
        <h1>Liste des films</h1>

        <!-- Barre de recherche et filtres -->
        <div class="search-bar">
            <input type="text" v-model="search" placeholder="Rechercher un film..." @keyup.enter="fetchMovies" />
            <button @click="fetchMovies">Rechercher</button>
            <select v-model="selectedGenre" @change="fetchMovies">
                <option value="">Tous les genres</option>
                <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
            </select>
        </div>
    
        <!-- Grille des films -->
        <div class="movies-grid">
            <MovieCard
            v-for="movie in moviesStore.movies"
            :key="movie.id"
            :movie="movie"
            />
        </div>
        
        <!-- Pagination -->
        <Pagination
            :total-items="moviesStore.totalItems"
            :page-size="itemsPerPage"
            :current-page="currentPage"
            @update:currentPage="page => { currentPage = page; fetchMovies() }"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import api from '@/api/axios'
    import { useMoviesStore } from '@/store/movies'
    import MovieCard from '@/components/MovieCard.vue'
    import Pagination from '@/components/Pagination.vue'

    const moviesStore = useMoviesStore()
    const currentPage = ref(1)
    const itemsPerPage = 12
    const search = ref('')
    const selectedGenre = ref('')
    const genres = ref([])

    // Charger les films
    const fetchMovies = async () => {
        await moviesStore.fetchMovies({
            page: currentPage.value,
            itemsPerPage,
            title: search.value || undefined,
            genreId: selectedGenre.value || undefined
        })
    }

    // Charger les genres
    const fetchGenres = async () => {
        const res = await api.get('/genres')
        genres.value = res.data['hydra:member'] || []
    }

    onMounted(async () => {
        await fetchGenres()
        await fetchMovies()
    })
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

    .search-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
</style>
