<template>
    <div class="movie-card">
        <router-link :to="`/movies/${movie.id}`" class="card-link">
            <div class="poster-wrapper">
                <img 
                    :src="movie.poster" 
                    :alt="movie.title"
                    @error="handleImageError"
                />
                <div class="overlay">
                    <span class="view-details">Voir détails</span>
                </div>
            </div>
            
            <div class="card-content">
                <h3 class="movie-title">{{ movie.title }}</h3>
                <p class="movie-year">{{ movie.year }}</p>
                
                <div class="movie-genres">
                    <span 
                        v-for="genre in movie.genres?.slice(0, 2)" 
                        :key="genre.id" 
                        class="genre-tag"
                    >
                        {{ genre.label }}
                    </span>
                </div>
            </div>
        </router-link>
        
        <div class="card-footer">
            <RatingStars 
                :rating="movie.userRating || movie.averageRating || 0" 
                @update:rating="val => updateRating(movie.id, val)" 
            />
        </div>
    </div>
</template>

<script setup>
import RatingStars from './RatingStars.vue'
import api from '@/api/axios'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const props = defineProps({
    movie: Object
})

const updateRating = async (movieId, rating) => {
    if (!authStore.isAuthenticated) {
        alert('Vous devez être connecté pour noter un film')
        return
    }
    
    try {
        await api.post('/ratings', { 
            movie: `/api/movies/${movieId}`,
            rating 
        })
    } catch (error) {
        console.error('Erreur notation:', error)
    }
}

const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'
}
</script>

<style scoped>
.movie-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.movie-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-link {
    text-decoration: none;
    color: inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.poster-wrapper {
    position: relative;
    width: 100%;
    padding-top: 150%; /* Ratio 2:3 */
    overflow: hidden;
    background: #f0f0f0;
}

.poster-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.movie-card:hover .poster-wrapper img {
    transform: scale(1.05);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.movie-card:hover .overlay {
    opacity: 1;
}

.view-details {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border: 2px solid white;
    border-radius: 8px;
}

.card-content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.movie-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: #212529;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.movie-year {
    color: #6c757d;
    font-size: 0.875rem;
    margin: 0 0 0.75rem 0;
}

.movie-genres {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-top: auto;
}

.genre-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    background: #e7f3ff;
    color: #0d6efd;
    border-radius: 6px;
    font-weight: 500;
}

.card-footer {
    padding: 0.75rem 1rem;
    border-top: 1px solid #f0f0f0;
}
</style>