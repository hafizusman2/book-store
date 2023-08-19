<template>
  <div class="container mt-5 text-center">
    <h5>{{ route.params.id ? 'Update' : 'Add' }} Book</h5>
  </div>
  <BookForm :bookId="parseInt(route.params.id)" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import BookForm from '@/components/BookForm.vue'

const route = useRoute()
</script>

<style scoped>
h3 {
  margin-bottom: 1.5rem;
}
</style>
