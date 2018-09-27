<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 timeline-wrapper" v-for="(stat, key) in status.data" :key="key">
      <div class="media ">
        <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
        <span class="media-body twit-status">
          <h5 class="mt-0">{{ stat.user.name }}</h5>
          <p>@j{{ stat.user.username }}</p>
          {{ stat.content }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Status',
  created () {
    // commitStatus
    let self = this

    axios({
      method: 'GET',
      url: `${self.$baseurl}/status`
    })
      .then(response => {
        let status = response.data.status

        if (status.length !== 0) {
          let payload = {
            data: status,
            empty: false
          }
          self.$store.dispatch('commitStatus', payload)
        }
      })
      .catch(err => {
        let message = err.response.data.message
        console.log(message)
      })
  },
  computed: {
    status () {
      return this.$store.state.status
    }
  }
}
</script>

<style>

</style>
