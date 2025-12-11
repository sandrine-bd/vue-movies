<template>
  <div class="collections-page">
    <h1>Mes collections</h1>

    <!-- Formulaire création collection -->
    <div class="create-collection">
      <input
        v-model="newCollectionName"
        placeholder="Nom de la nouvelle collection"
      />
      <button @click="createCollection">Créer</button>
    </div>

    <!-- Liste des collections -->
    <div v-if="collections.length">
      <div
        v-for="col in collections"
        :key="col.id"
        class="collection-card"
      >
        <h2>{{ col.name }}</h2>

        <!-- Boutons -->
        <div class="actions">
          <button @click="toggleOpen(col.id)">
            {{ openedCollection === col.id ? "Fermer" : "Voir les films" }}
          </button>

          <button @click="deleteCollection(col.id)" class="danger">
            Supprimer
          </button>
        </div>

        <!-- Films de la collection -->
        <div v-if="openedCollection === col.id" class="entries">
          <div v-if="entries.length">
            <div v-for="entry in entries" :key="entry.id" class="entry-item">
              <img
                :src="entry.movie.poster"
                :alt="entry.movie.title"
                width="70"
              />
              <span>{{ entry.movie.title }}</span>
              <button @click="removeEntry(entry.id)" class="danger">
                Retirer
              </button>
            </div>
          </div>
          <p v-else>Cette collection est vide.</p>
        </div>
      </div>
    </div>

    <p v-else>Aucune collection pour le moment.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/store/auth"
import api from "@/api/axios"

const authStore = useAuthStore()
const collections = ref([])
const entries = ref([])

const newCollectionName = ref("")
const openedCollection = ref(null) // ID de la collection actuellement ouverte

// Charger les collections de l'utilisateur
const fetchCollections = async () => {
  if (!authStore.user) return

  const res = await api.get(`/users/${authStore.user.id}/collections`)
  collections.value = res.data.member || []
}

// Créer une nouvelle collection
const createCollection = async () => {
  if (!newCollectionName.value.trim()) return

  const res = await api.post("/custom_lists", {
    name: newCollectionName.value,
    user: `/api/users/${authStore.user.id}`
  })

  collections.value.push(res.data)
  newCollectionName.value = ""
}

// Supprimer une collection
const deleteCollection = async (id) => {
  await api.delete(`/custom_lists/${id}`)
  collections.value = collections.value.filter((c) => c.id !== id)

  if (openedCollection.value === id) {
    openedCollection.value = null
    entries.value = []
  }
}

// Ouvrir / fermer une collection
const toggleOpen = async (id) => {
  if (openedCollection.value === id) {
    openedCollection.value = null
    entries.value = []
    return
  }

  openedCollection.value = id

  const res = await api.get(`/custom_lists/${id}`)

  entries.value = res.data.member || []
}

// Retirer un film de la collection
const removeEntry = async (entryId) => {
  await api.delete(`/custom_list_entries/${entryId}`)
  entries.value = entries.value.filter((e) => e.id !== entryId)
}

onMounted(fetchCollections)
</script>

<style>
.collections-page {
  max-width: 700px;
  margin: auto;
}

.collection-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.entry-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.danger {
  background: #ff6666;
  color: white;
}
</style>
