<template>
  <div>
    <h3>{{ route.params.id ? 'Update' : 'Add' }} Book</h3>
    <BookForm :bookId="parseInt(route.params.id)" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import BookForm from '@/components/BookForm.vue'

const route = useRoute()
</script>
