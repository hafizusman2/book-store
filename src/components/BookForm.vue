<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="title">Title</label>
      <input v-model="book.title" type="text" class="form-control" id="title" required />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        v-model="book.description"
        class="form-control"
        id="description"
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="dueDate">Due Date</label>
      <input v-model="book.due_date" type="date" class="form-control" id="dueDate" required />
    </div>
    <div class="form-group">
      <label for="status">Status</label>
      <select v-model="book.status" class="form-control" id="status" required>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">
      {{ bookId && book.id ? 'Update' : 'Add' }} Book
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { addUserBook, updateUserBook, getUserBookById } from '../services/book.js'

const props = defineProps({
  bookId: {
    type: Number,
    default: null
  }
})

onMounted(() => {
  if (props.bookId) {
    const bookData = getUserBookById(1, props.bookId)
    if (!bookData) return
    book.value = bookData
  }
})
const book = ref({
  id: null,
  title: '',
  description: '',
  due_date: '',
  status: 'pending'
})

const submitForm = () => {
  if (props.bookId && book.value.id) updateUserBook(1, props.bookId, book.value)
  addUserBook(1, book.value)
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

textarea {
  resize: vertical;
}
</style>
