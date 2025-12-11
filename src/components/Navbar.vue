<template>
    <nav class="navbar">
        <div class="navbar-container">
            <!-- GAUCHE : logo -->
            <router-link to="/" class="logo">
                🎬 Passion Cinéma
            </router-link>

            <!-- DROITE : liens de navigation -->
            <div class="nav-links">
                <router-link to="/" class="nav-item">Films</router-link>
                <router-link to="/collections" class="nav-item">Collections</router-link>

                <!-- Si non connecté -->
                <template v-if="!isLoggedIn">
                    <router-link to="/login" class="nav-item auth-btn">Connexion</router-link>
                    <router-link to="/register" class="nav-item auth-btn primary">Créer un compte</router-link>
                </template>

                <!-- Si connecté -->
                <template v-else>
                    <router-link :to="`/users/${user.id}`" class="nav-item user-profile">
                        <span class="user-avatar">{{ user.username?.[0]?.toUpperCase() }}</span>
                        {{ user.username }}
                    </router-link>

                    <button class="nav-item logout-btn" @click="logout">
                        Déconnexion
                    </button>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const isLoggedIn = computed(() => auth.isAuthenticated)
const user = computed(() => auth.user)

const logout = () => {
    auth.logout()
    router.push('/login')
}
</script>

<style scoped>
.navbar {
    background: #1a1a1a;
    color: white;
    width: 100%;
}

.navbar-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: white;
    letter-spacing: -0.5px;
    transition: opacity 0.2s;
}

.logo:hover {
    opacity: 0.8;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-item {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s;
    white-space: nowrap;
}

.nav-item:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
}

/* Boutons d'authentification */
.auth-btn {
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-btn.primary {
    background: #0d6efd;
    border-color: #0d6efd;
    color: white;
}

.auth-btn.primary:hover {
    background: #0b5ed7;
}

/* Profil utilisateur */
.user-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #0d6efd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
}

/* Bouton déconnexion */
.logout-btn {
    background: transparent;
    border: 1px solid #dc3545;
    color: #dc3545;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
}

.logout-btn:hover {
    background: #dc3545;
    color: white;
}

/* Responsive */
@media (max-width: 768px) {
    .navbar-container {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
    }

    .nav-links {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }
}
</style>