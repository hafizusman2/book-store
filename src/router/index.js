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

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/books') // Redirect to /books
  } else {
    next() // Continue navigation as usual
  }
})

export default router
