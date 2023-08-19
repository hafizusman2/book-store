import { createStore } from 'vuex'
import user from './user'

// Create a new store instance
const store = createStore({
  modules: {
    user
  },
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

export default store
