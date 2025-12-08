<template>
    <div class="pagination">
        <button :disabled="currentPage === 1" @click="$emit('change', currentPage - 1)">Précédent</button>
        <span>Page {{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="$emit('change', currentPage + 1)">Suivant</button>
    </div>
</template>

<script setup>
    defineProps({
        totalItems: Number,
        pageSize: Number,
        currentPage: Number,
    })

    const totalPages = Math.ceil(totalItems / pageSize)
</script>