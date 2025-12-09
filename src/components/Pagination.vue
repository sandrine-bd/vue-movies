<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Précédent
    </button>

    <button 
      v-for="page in pages" 
      :key="page" 
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button 
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Suivant
    </button>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 12
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

// Génère la liste des numéros de page
const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= totalPages.value; i++) {
    arr.push(i)
  }
  return arr
})

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 0.5rem;
  align-items: center;
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
