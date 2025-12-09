<template>
  <div class="register">
    <h1>Créer un compte</h1>
    <form @submit.prevent="submitRegister">
        <div>
            <label>Email</label>
            <input type="email" v-model="email" required />
        </div>
        <div>
            <label>Nom d'utilisateur</label>
            <input type="text" v-model="username" required />
        </div>
        <div>
            <label>Mot de passe</label>
            <input type="text" v-model="password" required />
        </div>
        <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
    import { ref } from 'vue'
    import api from "@/api/axios"
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const email = ref('')
    const username = ref('')
    const password = ref('')
    const error = ref(null) 

    const submitRegister = async () => {
        try {
            await api.post('/users', {
                email,
                username,
                plainPassword: password
            })
            router.push('/login')
        } catch (error) {
            error.value = 'Impossible de créer le compte'
            console.error(err)
        }
    }
</script>

<style scoped>
    .register {
        max-width: 400px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .error {
        color: red;
    }
</style>