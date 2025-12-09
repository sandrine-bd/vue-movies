import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '@/views/MoviesList.vue'
import MovieDetails from '@/views/MovieDetails.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import Collections from '@/views/UserCollections.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: MoviesList
    },
    { 
        path: '/movie/:id', 
        name: 'movies-details',
        component: MovieDetails,
        props: true // envoie automatiquement id comme prop au composant
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login 
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    { 
        path: '/user/:id',
        name: 'profile',
        component: Profile,
        props: true
    },
    {
        path: '/collections',
        name: 'collections',
        component: Collections
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 