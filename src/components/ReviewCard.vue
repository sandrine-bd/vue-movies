<template>
  <div class="review-card">
    <header class="review-header">
      <div class="review-author">
        <strong>{{ review.user.username }}</strong>
        <span class="review-date">{{ formattedDate }}</span>
      </div>

      <RatingStars :rating="review.rating" :size="18" />
    </header>

    <p class="review-content">
      {{ review.content }}
    </p>

    <footer class="review-footer" v-if="showActions">
      <button class="btn-like" @click="emit('like', review.id)">
        👍 {{ review.likes ?? 0 }}
      </button>
    </footer>
  </div>
</template>

<script setup>
import RatingStars from '@/components/RatingStars.vue'
import { computed } from 'vue'

const props = defineProps({
  review: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['like'])

const formattedDate = computed(() => {
  if (!props.review.createdAt) return ''
  return new Date(props.review.createdAt).toLocaleDateString()
})
</script>

<style scoped>
.review-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
  margin-bottom: 1rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
}

.review-author {
  display: flex;
  flex-direction: column;
}

.review-date {
  font-size: .8rem;
  color: #777;
}

.review-content {
  margin: .5rem 0;
  line-height: 1.4;
}

.review-footer {
  margin-top: .5rem;
}

.btn-like {
  background: #eee;
  border: none;
  padding: .4rem .7rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-like:hover {
  background: #ddd;
}
</style>
