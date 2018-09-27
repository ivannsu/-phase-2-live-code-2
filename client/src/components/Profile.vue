<template>
  <div class="twPc-div">
    <a class="twPc-bg twPc-block bg-info"></a>
    <div>
      <a title="Mert S. Kaplan" href="https://twitter.com/mertskaplan" class="twPc-avatarLink">
        <img alt="Mert S. Kaplan" src="https://mertskaplan.com/wp-content/plugins/msk-twprofilecard/img/mertskaplan.jpg" class="twPc-avatarImg">
      </a>

      <div class="twPc-divUser">
        <div class="twPc-divName">
          <span>{{ user.name }}</span>
        </div>
        <span>
          <span>@{{ user.username }}</span>
        </span>
      </div>

      <div class="twPc-divStats">
        <ul class="twPc-Arrange">
          <li class="twPc-ArrangeSizeFit">
            <a href="https://twitter.com/mertskaplan" title="9.840 Tweet">
              <span class="twPc-StatLabel twPc-block">Tweets</span>
              <span class="twPc-StatValue">{{ totalStatus }}</span>
            </a>
          </li>
          <li class="twPc-ArrangeSizeFit">
            <a href="https://twitter.com/mertskaplan/following" title="885 Following">
              <span class="twPc-StatLabel twPc-block">Following</span>
              <span class="twPc-StatValue">{{ user.following.length }}</span>
            </a>
          </li>
          <li class="twPc-ArrangeSizeFit">
            <a href="https://twitter.com/mertskaplan/followers" title="1.810 Followers">
              <span class="twPc-StatLabel twPc-block">Followers</span>
              <span class="twPc-StatValue">{{ user.followers.length }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data () {
    return {
      user: null,
      totalStatus: 0
    }
  },
  methods: {
    fetchData () {
      // 
      let self = this

      axios({
        method: 'GET',
        url: `${self.$baseurl}/users/detail/${self.userId}`
      })
        .then(response => {
          let data = response.data
          self.user = data.user
          self.totalStatus = data.totalStatus
        })
        .catch(err => {
          let message = err.response.data.message
          console.log(message)
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
