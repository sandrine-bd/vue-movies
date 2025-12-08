<script setup lang="ts">
import RatingStars from '../components/RatingStars.vue';

</script>

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
                <buttons @click="followUser(follower.id)">Suivre</buttons>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMoutned } from 'vue'
    import api from '../api/axios'
    import RatingStars from '../components/RatingStars.vue'

    const user = ref({})
    const reviews = ref([])
    const collections = ref([])
    const following = ref([])
    const followers = ref([])

    const fetchProfile = async () => {
        const resUser = await api.get('/api/users/me')
        user.value = resUser.data

        const resReviews = await api.get('/api/users/me/reviews')
        reviews.value = resReviews.data 

        const resCollections = await api.get('/api/users/me/collections')
        collections.value = resCollections.data

        const resFollowing = await api.get('/api/users/me/follows')
        following.value = resFollowing.data 

        const resFollowers = await api.get('/api/users/me/followers')
        followers.value = resFollowers.data 
    }

    const followUser = async (id) => {
        await api.post(`/api/users/)
    }
</script>