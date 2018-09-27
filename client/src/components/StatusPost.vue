<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 mb-12 form-horizontal">
      <div class="form-group">
        <textarea class="form-control" placeholder="What's happening?" rows="3" v-model="status"></textarea>
      </div>
      <div class="form-group">
        <button class="btn-info" @click="postStatus">Post</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StatusPost',
  data () {
    return {
      status: ''
    }
  },
  methods: {
    postStatus () {
      let self = this

      axios({
        method: 'POST',
        url: `${self.$baseurl}/status`,
        headers: {
          token: self.token
        },
        data: {
          content: self.status
        }
      })
        .then(response => {
          console.log(response.data)
          self.$router.replace({ path: '/' })
        })
        .catch(err => {
          let message = err.response.data.message
          console.log(message)
        })
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
