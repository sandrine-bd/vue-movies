import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '@/views/MoviesList.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'

const routes = [
    { path: '/', component: MoviesList },
    { path: '/movie/:id', component: MovieDetail, props: true },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router 