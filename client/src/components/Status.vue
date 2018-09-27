<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 timeline-wrapper" v-for="(stat, key) in status.data" :key="key">
      <div class="media ">
        <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
        <span class="media-body twit-status">
          <h5 class="mt-0">{{ stat.user.name }}</h5>
          <p>@{{ stat.user.username }}</p>
          {{ stat.content }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Status',
  created () {
    this.$store.dispatch('commitStatus')
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
