import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_USER(state, value) {
      state.user = value
    },
    SET_TOKEN(state, value) {
      state.token = value
    }
  },
  actions: {
    setUser({ commit }, value) {
      commit('SET_USER', value)
    },
    setToken({ commit }, value) {
      commit('SET_TOKEN', value)
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token
    }
  },
  modules: {
  }
})
