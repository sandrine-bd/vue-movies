<template>
    <nav class="navbar">
        <!-- GAUCHE : logo -->
        <router-link to="/" class="logo">
             🎬 MovieApp
        </router-link>

        <!-- DROITE : liens de navigation -->
         <div class="nav-links">

            <router-link to="/" class="nav-item">Films</router-link>
            <router-link to="/collections" class="nav-item">Collections</router-link>

            <!-- Si non connecté -->
            <template v-if="!isLoggedIn">
                <router-link to="/login" class="nav-item auth">Connexion</router-link>
                <router-link to="/register" class="nav-item auth">Créer un compte</router-link>
            </template>

            <!-- Si connecté -->
             <template v-else>
                <router-link :to="`/user/${user.id}`" class="nav-item">
                    <i class="ph-user"></i> {{ user.name }}
                </router-link>

                <button class="nav-item logout" @click="logout">
                    <i class="ph-sign-out"></i> Déconnexion
                </button>
             </template>
         </div>
    </nav>
</template>

<script setup>
    import { computed } from 'vue'
    import { useAuthStore } from '@/store/auth'

    const auth = useAuthStore()

    const isLoggedIn = computed(() => auth.isAuthenticated)
    const user = computed(() => auth.user)

    const logout = () => {
        auth.logout()
    }
</script>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1a1a1a;
        padding: 1rem 2rem;
        color: white;
    }

    .logo {
        font-size: 1.4rem;
        font-weight: bold;
        text-decoration: none;
        color: white;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .nav-item {
        color: #ddd;
        text-decoration: none;
        font-size: 1rem;
        transition: 0.2s;
    }

    .nav-item:hover {
        color: white;
    }

    /* Boutons Login / Register */
    .auth {
        padding: 0.4rem 0.8rem;
        border: 1px solid #555;
        border-radius: 6px;
    }

    .auth:hover {
        background: #333;
    }

    .logout {
        background: transparent;
        border: none;
        color: #ff6b6b;
        cursor: pointer;
        font-size: 1rem;
    }

    .logout:hover {
        color: #ff8787;
    }
</style>