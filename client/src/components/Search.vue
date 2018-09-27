<template>
  <div class="card mb-3" style="max-width: 18rem;">
    <div class="card-body">
      <input type="text" placeholder="Search..." v-model="keyword">
      <button class="btn-info" @click="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      results: [],
      msg: false
    }
  },
  methods: {
    search () {
      if (this.keyword.length === 0) {
        alert('Empty keyword !')
      } else {
        this.status.forEach(stat => {
          let content = stat.content
          let pattern = new RegExp(this.keyword, "ig")
          let search = content.match(pattern)

          if (search.length !== 0) {
            this.results.push(stat)
          }
        })

        console.log(this.results)

        if (this.results.length !== 0) {
          console.log('ADA PAK')
          this.$store.dispatch('commitWriteStatus', this.results)
        } else {
          console.log('ga ada data search')
          this.msg = true
        }
      }
    }
  },
  computed: {
    status () {
      return this.$store.state.status.data
    }
  }
}
</script>

<style>

</style>
