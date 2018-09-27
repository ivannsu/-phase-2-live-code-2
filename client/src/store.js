import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseurl: 'http://localhost:3000',
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
    commitStatus ({ commit }) {
      axios({
        method: 'GET',
        url: `${this.state.baseurl}/status`
      })
        .then(response => {
          let status = response.data.status
          if (status.length !== 0) {
            let payload = {
              data: status,
              empty: false
            }
            commit('setStatus', payload)
          }
        })
        .catch(err => {
          let message = err.response.data.message
          console.log(message)
        })
    },
    commitWriteStatus ({ commit }, payload) {
      console.log('masuk ga')
      console.log(payload)
      commit('setStatus', { data: payload, empty: false })
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
