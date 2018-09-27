<template>
  <div class="card-body who-to-follow">
    <h5 class="card-title">Who to Follow <small><a href="javascript:void(0)" @click="refreshData">Refresh</a></small></h5>
    <ul id="recently-followed">
      <li v-for="(user, key) in users.data" :key="key">
        <div class="media">
          <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
          <span class="media-body twit-status">
            <h6 class="mt-0">{{ user.name }} <small>@{{ user.username }}</small></h6>
            <button class="btn btn-outline-info" @click="follow(user._id)">Follow</button>
            <button class="btn btn-disabled" disabled>Followed</button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Suggestion',
  data () {
    return {
      users: {
        data: [],
        empty: false
      }
    }
  },
  methods: {

    fetchData () {
      let self = this

      axios({
        method: 'GET',
        url: `${self.$baseurl}/users/suggestions/${self.userId}`
      })
        .then(response => {
          let users = response.data.results
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
          console.log(message)
        })
    },
    follow (followingId) {
      let self = this

      axios({
        method: 'POST',
        url: `${self.$baseurl}/users/follow/${self.userId}`,
        data: {
          followingId
        }
      })
        .then(response => {
          
        })
        .catch(err => {
          let message = err.response.data.message
          console.log(message)
        })
    },
    refreshData () {
      this.fetchData()  
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
