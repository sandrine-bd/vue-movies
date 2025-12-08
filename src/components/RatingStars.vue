<template>
  <div class="rating-stars">
    <Star
      v-for="i in 5"
      :key="i"
      :size="24"
      :weight="i <= rating ? 'fill' : 'regular'"
      @click="$emit('update:rating', i)"
      class="cursor-pointer"
    />
  </div>
</template>

<script setup>
    import { Star } from '@phosphor-icons/vue'
    defineProps({
        rating: Number,
    })
</script>

<style>
    .cursor-pointer { cursor: pointer; }
</style>