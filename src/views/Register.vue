<template>
  <div class="register-page">
    <div class="register-card">
      <h1>Créer un compte</h1>
      
      <form @submit.prevent="submitRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="VotreNom"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn-submit">S'inscrire</button>
      </form>

      <p class="login-link">
        Déjà un compte ? 
        <router-link to="/login">Se connecter</router-link>
      </p>
    </div>
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
    error.value = null
    
    try {
        await api.post('/users', {
            email: email.value,
            username: username.value,
            plainPassword: password.value
        })
        
        // Redirection vers login après succès
        router.push('/login')
    } catch (err) {
        error.value = 'Impossible de créer le compte. Email déjà utilisé ?'
        console.error('Erreur inscription:', err)
    }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
}

.register-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #28a745;
}

.error {
  color: #dc3545;
  background: #ffe6e6;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #218838;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.login-link a {
  color: #28a745;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>