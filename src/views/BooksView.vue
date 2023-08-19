<template>
  <div>
    <router-link :to="{ name: 'add-book' }" class="btn btn-primary"> Add Book </router-link>
  </div>
  <div>
    <q-dialog v-model="showModal" persistent>
      <q-card style="width: 600px">
        <q-card-section>
          <q-card-section>
            <strong> {{ selectedBook.title }}</strong>
          </q-card-section>
          <q-card-section>
            <p><strong>Book Id:</strong> {{ selectedBook.id }}</p>
            <p><strong>Due Date:</strong> {{ formatDate(selectedBook.due_date) }}</p>
            <p><strong>Status:</strong> {{ selectedBook.status }}</p>
            <strong>Description:</strong>
            <p>{{ selectedBook.description }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <div class="q-pa-md">
    <q-table title="Books" :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="due_date" :props="props">
            {{ formatDate(props.row.due_date) }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="view" :props="props">
            <q-btn color="primary" @click="viewBook(props.row)" name="view" icon="visibility" />
          </q-td>
          <q-td key="update" :props="props">
            <q-btn color="primary" @click="updateBook(props.row.id)" name="update" icon="edit" />
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn color="negative" @click="deleteBook(props.row.id)" name="delete" icon="delete" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getUserBooks, deleteUserBook } from '../services/book.js'

onMounted(() => {
  getBooks()
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const rows = ref([])
const showModal = ref(false)
const selectedBook = ref({})

const router = useRouter()
const getBooks = () => {
  const bookData = getUserBooks(1)
  if (bookData) {
    rows.value = bookData
  }
}

const deleteBook = (bookId) => {
  deleteUserBook(1, bookId)
  getBooks()
}

const updateBook = (bookId) => {
  router.push({ name: 'edit-book', params: { id: bookId } })
}
const viewBook = (bookData) => {
  selectedBook.value = bookData
  showModal.value = true
}

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
    format: (val) => formatDate(val)
  },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
  {
    name: 'view',
    label: 'View',
    align: 'center'
  },
  {
    name: 'update',
    label: 'Update',
    align: 'center'
  },
  {
    name: 'delete',
    label: 'Delete',
    align: 'center'
  }
]
</script>
