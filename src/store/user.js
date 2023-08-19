import { reactive } from 'vue'

// State
const state = reactive({
  userData: {
    id: null
  }
})

// Getters
const getters = {
  getUserData: (state) => state.userData,
  getUserId: (state) => (state.userData ? state.userData.id : null)
}

// Mutations
const mutations = {
  setUserData: (state, userData) => {
    state.userData = userData
  },
  setUserId: (state, userId) => {
    state.userData.id = userId
  }
}

export default {
  state,
  getters,
  mutations
}
