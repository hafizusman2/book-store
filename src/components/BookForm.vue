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
    <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Update' : 'Add' }} Book</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  isEditMode: Boolean
})
const book = ref({
  id: null,
  title: '',
  description: '',
  due_date: '',
  status: 'pending'
})

const submitForm = () => {
  console.log(book.value, 'book data')
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
