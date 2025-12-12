<template>
    <div class="movies-list">
        <div class="page-header">
            <h1>Découvrir les films</h1>
            <p class="subtitle">{{ moviesStore.totalItems }} films disponibles</p>
        </div>

        <!-- Message d'erreur si API indisponible -->
        <div v-if="apiError" class="error-banner">
            ⚠️ Impossible de se connecter à l'API. Vérifiez que le backend est démarré.
        </div>

        <!-- Barre de recherche et filtres -->
        <div class="search-bar">
            <div class="search-input-wrapper">
                <input 
                    type="text" 
                    v-model="search" 
                    placeholder="Rechercher un film..." 
                    @keyup.enter="fetchMovies" 
                />
                <button class="btn-search" @click="fetchMovies">
                    🔍 Rechercher
                </button>
            </div>
            
            <select v-model="selectedGenre" @change="fetchMovies" class="genre-select">
                <option value="">Tous les genres</option>
                <option v-for="g in genres" :key="g.id" :value="g.id">
                    {{ g.label }}
                </option>
            </select>
        </div>
    
        <!-- Loading state -->
        <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>Chargement des films...</p>
        </div>

        <!-- Grille des films -->
        <div v-else-if="moviesStore.movies.length" class="movies-grid">
            <MovieCard
                v-for="movie in moviesStore.movies"
                :key="movie.id"
                :movie="movie"
            />
        </div>

        <!-- Message si aucun film -->
        <div v-else-if="!apiError" class="no-results">
            <p>Aucun film trouvé</p>
        </div>
        
        <!-- Pagination -->
        <Pagination
            v-if="moviesStore.movies.length"
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
const itemsPerPage = 15
const search = ref('')
const selectedGenre = ref('')
const genres = ref([])
const loading = ref(false)
const apiError = ref(false)

const fetchMovies = async () => {
    loading.value = true
    apiError.value = false
    
    try {
        await moviesStore.fetchMovies({
            page: currentPage.value,
            itemsPerPage,
            title: search.value || undefined,
            genreId: selectedGenre.value || undefined
        })
    } catch (error) {
        console.error('Erreur lors du chargement des films :', error)
        apiError.value = true
    } finally {
        loading.value = false
    }
}

const fetchGenres = async () => {
    try {
        const res = await api.get('/genres')
        genres.value = res.data.member || []
    } catch (error) {
        console.error('Erreur lors du chargement des genres :', error)
        apiError.value = true
    }
}

onMounted(async () => {
    await fetchGenres()
    await fetchMovies()
})
</script>

<style scoped>
.movies-list {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.page-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: #6c757d;
    font-size: 1.1rem;
}

/* Barre de recherche */
.search-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
}

.search-input-wrapper {
    display: flex;
    gap: 0.5rem;
    flex: 1;
    min-width: 300px;
}

.search-input-wrapper input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.2s;
    font-family: 'Inter', sans-serif;
}

.search-input-wrapper input:focus {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
}

.btn-search {
    padding: 0.75rem 1.5rem;
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.btn-search:hover {
    background: #0b5ed7;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.genre-select {
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
    font-family: 'Inter', sans-serif;
    min-width: 200px;
}

.genre-select:focus {
    outline: none;
    border-color: #0d6efd;
}

/* Grille des films */
.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

/* Loading */
.loading {
    text-align: center;
    padding: 4rem;
}

.spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 1rem;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #0d6efd;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading p {
    color: #6c757d;
    font-size: 1.1rem;
}

/* Messages d'erreur */
.error-banner {
    background: #fff3cd;
    border: 1px solid #ffc107;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    color: #856404;
    text-align: center;
}

.no-results {
    text-align: center;
    padding: 4rem;
    color: #6c757d;
    font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 768px) {
    .movies-list {
        padding: 1rem;
    }

    .page-header h1 {
        font-size: 2rem;
    }

    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
    }

    .search-bar {
        flex-direction: column;
    }

    .search-input-wrapper,
    .genre-select {
        width: 100%;
    }
}
</style>