<template>
  <form @submit.prevent="submitForm" class="book-form">
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
        rows="4"
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { addUserBook, updateUserBook, getUserBookById } from '../services/book.js'

const router = useRouter()
const store = useStore()

const userId = computed(() => store.getters.getUserId)

const props = defineProps({
  bookId: {
    type: Number,
    default: null
  }
})

onMounted(() => {
  if (props.bookId) {
    const bookData = getUserBookById(userId.value, props.bookId)
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
  let response = null
  if (props.bookId && book.value.id)
    response = updateUserBook(userId.value, props.bookId, book.value)
  else {
    response = addUserBook(userId.value, book.value)
  }
  if (response)
    setTimeout(() => {
      router.push('/books')
    }, 500)
}
</script>

<style scoped>
.book-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-weight: bold;
}

textarea {
  resize: none;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-primary:focus {
  box-shadow: none;
}
</style>
