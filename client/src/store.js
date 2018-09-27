import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    token: '',
    status: {
      data: [],
      empty: true
    }
  },
  mutations: {
    setStatus (state, payload) {
      state.status = payload
    },
    setUserId (state, payload) {
      state.userId = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    removeUserId (state) {
      state.userId = ''
    },
    removeToken (state) {
      state.token = ''
    }
  },
  actions: {
    commitStatus ({ commit }, payload) {
      commit('setStatus', payload)
    },
    commitUserId ({ commit }, payload) {
      commit('setUserId', payload)
    },
    commitToken ({ commit }, payload) {
      commit('setToken', payload)
    },
    removeUserId ({ commit }) {
      commit('removeUserId')
    },
    removeToken ({ commit }) {
      commit('removeToken')
    }
  }
})
