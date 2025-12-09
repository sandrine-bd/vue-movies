<template>
  <div class="pagination">
    <button @click="goToPage(props.currentPage - 1)" :disabled="props.currentPage <= 1">Prev</button>
    <span>Page {{ props.currentPage }} / {{ totalPages }}</span>
    <button @click="goToPage(props.currentPage + 1)" :disabled="props.currentPage >= totalPages">Next</button>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

// Déclare les événements
const emit = defineEmits(['change-page'])

// Calcul du nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize) || 1
})

// Fonction pour changer de page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('change-page', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
