<template>
  <div class="card  mb-3" style="max-width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Recently Followed</h5>
      <ul id="recently-followed">
        <li v-for="(user, key) in users.data" :key="key">
          <a href="#">{{ user.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RecentFollow',
  data () {
    return {
      users: {
        data: [],
        empty: true
      }
    }
  },
  methods: {
    fetchData () {
      let self = this

      axios({
        method: 'GET',
        url: `${self.$baseurl}/users/recentfollow/${self.userId}`
      })
        .then(response => {
          let users = response.data.user.following
          if (users.length !== 0) {
            self.users.data = users
            self.users.empty = false
          } else {
            self.users.data = []
            self.users.empty = true
          }
        })
        .catch(err => {
          let message = err.response.data.message
          console.log(message, '<====== as')
        })
    }
  },
  created () {
    this.fetchData() 
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
