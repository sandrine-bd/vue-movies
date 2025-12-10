import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '@/views/MoviesList.vue'
import MovieDetails from '@/views/MovieDetails.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import UserCollections from '@/views/UserCollections.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: MoviesList
    },
    { 
        path: '/movies/:id', 
        name: 'movie-details',
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
        path: '/users/:id',
        name: 'profile',
        component: Profile,
        props: true
    },
    {
        path: '/collections',
        name: 'collections',
        component: UserCollections,
        meta: { requiresAuth: true } // protection
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})

export default router 