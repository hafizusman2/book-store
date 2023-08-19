import { createRouter, createWebHistory } from 'vue-router'
import BookFormView from '../views/BookFormView.vue'
import BooksView from '../views/BooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/add-book',
      name: 'add-book',
      component: BookFormView
    },
    {
      path: '/edit-book/:id',
      name: 'edit-book',
      component: BookFormView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    }
  ]
})

export default router
