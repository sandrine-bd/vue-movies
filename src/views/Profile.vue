<template>
    <div class="profile-page">
        <div class="user-info">
            <h1>{{ user.name }}</h1>
            <p>Email : {{ user.email }}</p>
            <p>Abonnés : {{ followers.length }}</p>
            <p>Abonnements : {{ following.length }}</p>
        </div>

        <div class="collections">
            <h2>Mes collections</h2>
            <div v-for="col in collections" :key="col.id" class="collection-card">
                <h3>{{ col.name }}</h3>
                <ul>
                    <li v-for="movie in col.movies" :key="movie.id">{{ movie.title }}</li>
                </ul>
            </div>
        </div>

        <div class="reviews">
            <h2>Mes critiques et notes</h2>
            <div v-for="review in reviews" :key="review.id" class="review-card">
                <strong>{{ review.movie.title }}</strong>
                <RatingStars :rating="review.rating" />
                <p>{{ review.comment }}</p>
            </div>
        </div>

        <div class="following">
            <h2>Utilisateurs suivis</h2>
            <div v-for="userItem in following" :key="userItem.id" class="user-card">
                <p>{{ userItem.username }}</p>
                <button @click="unfollowUser(userItem.id)">Se désabonner</button>
            </div>
        </div>

        <div class="followers">
            <h2>Mes abonnés</h2>
            <div v-for="follower in followers" :key="follower.id" class="user-card">
                <p>{{ follower.username }}</p>
                <button @click="followUser(follower.id)">Suivre</button>
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
const user = ref({})
const reviews = ref([])
const ratings = ref([])
const collections = ref([])
const followers = ref([])
const following = ref([])

const userId = route.params.id

const fetchProfile = async () => {
  try {
    user.value = (await api.get(`/users/${userId}`)).data
    reviews.value = (await api.get(`/users/${userId}/reviews`)).data.member || []
    ratings.value = (await api.get(`/users/${userId}/ratings`)).data.member || []
    collections.value = (await api.get(`/users/${userId}/collections`)).data.member || []
    followers.value = (await api.get(`/users/${userId}/followers`)).data.member || []
    following.value = (await api.get(`/users/${userId}/follows`)).data.member || []
  } catch (error) {
    console.error("Erreur lors du chargement du profil :", error)
  }
}

const followUser = async (targetUserId) => {
  try {
    await api.post(`/users/${targetUserId}/follows`)
    // Recharger les données
    await fetchProfile()
  } catch (error) {
    console.error("Erreur follow :", error)
  }
}

const unfollowUser = async (targetUserId) => {
  try {
    await api.delete(`/users/${targetUserId}/follows`)
    // Recharger les données
    await fetchProfile()
  } catch (error) {
    console.error("Erreur unfollow :", error)
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 0 auto;
}

.user-info {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.collection-card,
.review-card,
.user-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>