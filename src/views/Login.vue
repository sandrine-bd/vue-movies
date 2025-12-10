<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Connexion</h1>
      
      <form @submit.prevent="login">
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

        <button type="submit" class="btn-submit">
          Se connecter
        </button>
      </form>

      <p class="signup-link">
        Pas encore de compte ? 
        <router-link to="/register">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref("")

const login = async () => {
  error.value = ""
  
  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    })

    if (success) {
      router.push("/")
    } else {
      error.value = "Identifiants incorrects"
    }
  } catch (e) {
    error.value = "Erreur de connexion. Veuillez réessayer."
    console.error("Erreur login:", e)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
}

.login-card {
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
  border-color: #007bff;
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
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #0056b3;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>