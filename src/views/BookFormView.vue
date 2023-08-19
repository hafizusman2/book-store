<template>
  <div class="container mt-5 text-center">
    <p v-if="phoneNumber">User Phone: {{ phoneNumber }}</p>
    <p v-if="!phoneNumber && userId">User ID: {{ userId }}</p>
    <h5>{{ route.params.id ? 'Update' : 'Add' }} Book</h5>
  </div>
  <BookForm :bookId="parseInt(route.params.id)" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import BookForm from '@/components/BookForm.vue'

const store = useStore()
const route = useRoute()

const userId = computed(() => store.getters.getUserId)
const phoneNumber = computed(() => store.getters.getPhoneNumber)
</script>
