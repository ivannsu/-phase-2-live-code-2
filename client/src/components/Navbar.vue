<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Victwitter</a>
      <div class="header-right" v-if="authenticated">
        <button class="btn-danger" @click="logout">Logout</button>
      </div>
      <div class="header-right" v-else>
        <input type="text" placeholder="username / email" v-model="acc">
        <input type="password" placeholder="password" v-model="password">
        <button class="btn-info" @click="login">Login</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data () {
    return {
      acc: '',
      password: '',
      authenticated: false
    }
  },
  methods: {
    login () {
      let self = this

      axios({
        method: 'POST',
        url: `${self.$baseurl}/users/signin`,
        data: {
          acc: self.acc,
          password: self.password
        }
      })
        .then(response => {
          let data = response.data

          localStorage.setItem('userId', data.userId)
          localStorage.setItem('token', data.token)

          self.$store.dispatch('commitUserId', data.userId)
          self.$store.dispatch('commitToken', data.token)

          self.authenticated = true
        })
        .catch(err => {
          let message = err.response.data.message
          console.log(message)
        })
    },

    logout () {
      localStorage.removeItem('userId')
      localStorage.removeItem('token')

      this.$store.dispatch('removeUserId')
      this.$store.dispatch('removeToken')

      this.authenticated = false

      this.acc = ''
      this.password = ''
    }
  },
  created () {
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')

    if (userId && token) {
      this.$store.dispatch('commitUserId', userId)
      this.$store.dispatch('commitToken', token)
      this.authenticated = true
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userId () {
      return this.$store.state.userId
    }
  }
}
</script>

<style>

</style>
