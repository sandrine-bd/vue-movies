<template>
  <div class="rating-stars">
    <span v-for="n in 5" :key="n" @click="update(n)">
      <Icon :icon="n <= rating ? 'ph:star-fill' : 'ph:star'" />
    </span>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    rating: { type: Number, default: 0 }
  })

  const emit = defineEmits(['update:rating'])

  function update(value) {
    emit('update:rating', value)
  }

</script>

<style>
.cursor-pointer { cursor: pointer; }

.rating-stars {
  display: flex;
  cursor: pointer;
  gap: 4px;
  align-items: center;
}
</style>