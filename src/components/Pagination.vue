<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Précédent</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Suivant</button>
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

const emit = defineEmits(['update:currentPage']) // Déclare les événements
const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize) || 1) // Calcul du nombre total de pages
const changePage = (page) => emit('update:currentPage', page) // Fonction pour changer de page
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
