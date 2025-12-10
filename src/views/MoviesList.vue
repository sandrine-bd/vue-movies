<template>
    <div class="movies-list">
        <h1>Liste des films</h1>

        <!-- Message d'erreur si API indisponible -->
        <div v-if="apiError" class="error-banner">
            ⚠️ Impossible de se connecter à l'API. Vérifiez que le backend est démarré sur http://localhost:8000
        </div>

        <!-- Barre de recherche et filtres -->
        <div class="search-bar">
            <input type="text" v-model="search" placeholder="Rechercher un film..." @keyup.enter="fetchMovies" />
            <button @click="fetchMovies">Rechercher</button>
            <select v-model="selectedGenre" @change="fetchMovies">
                <option value="">Tous les genres</option>
                <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
            </select>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="loading">Chargement...</div>
    
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
    const loading = ref(false)
    const apiError = ref(false)

    // Charger les films
    const fetchMovies = async () => {
        loading.value = true
        try {
            await moviesStore.fetchMovies({
            page: currentPage.value,
            itemsPerPage,
            title: search.value || undefined,
            genreId: selectedGenre.value || undefined
            })
        } finally {
            loading.value = false
        }
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
.movies-list {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.search-bar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.search-bar input {
    flex: 1;
    min-width: 200px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-bar button,
.search-bar select {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    cursor: pointer;
}

.search-bar button:hover {
    background: #f0f0f0;
}

/* ✅ Styles pour messages d'erreur et loading */
.error-banner {
    background: #fee;
    border: 1px solid #fcc;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    color: #c00;
}

.loading {
    text-align: center;
    padding: 3rem;
    font-size: 1.2rem;
    color: #666;
}

.no-results {
    text-align: center;
    padding: 3rem;
    color: #999;
}
</style>
