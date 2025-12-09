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
import { ref, onMounted } from "vue";
import api from "@/api/axios";

const user = ref({});
const reviews = ref([]);
const ratings = ref([]);
const collections = ref([]);
const followers = ref([]);
const followings = ref([]);

const userId = localStorage.getItem("userId"); // stocké à la connexion

const fetchProfile = async () => {
  user.value = (await api.get(`/users/${userId}`)).data;

  reviews.value = (await api.get(`/users/${userId}/reviews`)).data["hydra:member"];
  ratings.value = (await api.get(`/users/${userId}/ratings`)).data["hydra:member"];
  collections.value = (await api.get(`/users/${userId}/collections`)).data["hydra:member"];
  followers.value = (await api.get(`/users/${userId}/followers`)).data["hydra:member"];
  followings.value = (await api.get(`/users/${userId}/follows`)).data["hydra:member"];
};

onMounted(fetchProfile);
</script>