<template>
  <div class="collections">
    <h1>Mes collections</h1>
    <div v-if="collections.length === 0">Vous n'avez pas encore de collections.</div>
    <div v-else>
        <div v-for="col in collections" :key="col.id" class="collection-card">
            <h2>{{ col.titre }}</h2>
            <ul>
                <li v-for="entry in col.entries" :key="entry.id">{{ entry.movie.title }}</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import api from '@/api/axios'

    const collections = ref([])

    const fetchCollections = async () => {
        try {
            const res = await api.get('/users/1/collections')
            collections.value = res.data
        } catch (err) {
            console.error('Erreur lors du chargement des collections', err)
        }
    }

    onMounted(fetchCollections)
</script>

<style scoped>
    .collections {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .collection-card {
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 5px;
    }
</style>