<template>
  <form class="review-form" @submit.prevent="submitReview">
    
    <h3>Écrire une critique</h3>

    <!-- Note -->
    <div class="form-group">
      <label>Votre note :</label>
      <RatingStars v-model:rating="rating" />
    </div>

    <!-- Contenu -->
    <div class="form-group">
      <label>Votre critique :</label>
      <textarea
        v-model="content"
        placeholder="Écrivez votre avis ici..."
        required
      ></textarea>
    </div>

    <!-- Erreurs -->
    <p class="error" v-if="error">{{ error }}</p>

    <!-- Bouton -->
    <button type="submit" :disabled="loading">
      <span v-if="loading">Envoi...</span>
      <span v-else>Publier la critique</span>
    </button>

  </form>
</template>

<script setup>
import { ref } from 'vue'
import RatingStars from '@/components/RatingStars.vue'
import api from '@/api/axios'

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['submitted'])

const rating = ref(0)
const content = ref('')
const loading = ref(false)
const error = ref(null)

const submitReview = async () => {
  error.value = null

  if (!rating.value || rating.value < 1) {
    error.value = "Veuillez donner une note."
    return
  }

  if (content.value.trim().length < 10) {
    error.value = "La critique doit contenir au moins 10 caractères."
    return
  }

  loading.value = true

  try {
    const payload = {
      movie: `/api/movies/${props.movieId}`,
      user: `/api/users/${props.userId}`,
      rating: rating.value,
      content: content.value
    }

    const response = await api.post("/reviews", payload)

    emit("submitted", response.data)

    // reset form
    rating.value = 0
    content.value = ""

  } catch (err) {
    error.value = "Erreur lors de l'envoi de la critique."
  }

  loading.value = false
}
</script>

<style scoped>
.review-form {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: #fafafa;
  margin: 1rem 0;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

textarea {
  min-height: 100px;
  padding: 0.6rem;
  resize: vertical;
  font-size: 1rem;
}

button {
  padding: .6rem 1rem;
  background: black;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-bottom: .5rem;
}
</style>
