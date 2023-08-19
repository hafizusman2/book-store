<template>
  <div>
    <router-link :to="{ name: 'add-book' }" class="btn btn-primary"> Add Book </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'edit-book', params: { id: 1 } }" class="btn btn-primary">
      Edit Book
    </router-link>
  </div>
  <div class="q-pa-md">
    <q-table title="Books" :rows="rows" :columns="columns" row-key="" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserBooks } from '../services/book.js'
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
const rows = ref([]) // Use ref to create a reactive variable

onMounted(() => {
  const bookData = getUserBooks(1)
  if (!bookData) return
  rows.value = bookData
})
const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'right',
    field: 'id',
    sortable: true
  },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  {
    name: 'due_date',
    label: 'Due Date',
    field: 'due_date',
    align: 'center',
    sortable: true,
    format: (val) => formatDate(val) // Format Date
  },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true }
]
</script>
