import { createRouter, createWebHistory } from 'vue-router'
import BookFormView from '../views/BookFormView.vue'
import BooksView from '../views/BooksView.vue'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView
    },
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
    // we can block unauthorized access to the books page
    next()
  } else {
    next()
  }
})

export default router
