<template>
<div class="deputy">
  <img v-bind:class="[zgodnosc ? 'zgodny' : 'niezgodny', '']" :src="imgURL" alt="">
  {{singleDeputy.name}}
  {{singleDeputy.vote}}
  {{singleDeputy.group}}
</div>
</template>

<script>
const $ = require('jquery')

export default {
  props: ['singleDeputy'],
  computed: {
    zgodnosc () {
      let result = this.$store.state.userVotes[this.$store.state.currentProject.drukNr] === this.singleDeputy.vote
      this.$store.commit('setDeputyStat', {deputy: this.singleDeputy, vote: result})
      return result
    },
    imgURL () {
      // $.get('https://api.qwant.com/api/search/images?count=1&locale=pl_pl&offset=1&q=' + this.singleDeputy.name.replace(' ', '+')).done(data => {
      //   console.log(data)
      // })
      return
    }
  },
  created () {
    // this.fetchIMG()
  },
  methods: {
    fetchIMG () {
      var self = this
      $.get('https://api.qwant.com/api/search/images?count=1&locale=pl_pl&offset=1&q=Adam+Abramowicz').done(data => {
        self.projects = data
      })
    }
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100px;
}
img {
  height: 80px;
  width: 80px;
  border-style: inset;
  border-radius: 100%;
  border-width: 8px;
  border-color: grey;
}
.zgodny{
  border-color: green;
}
.niezgodny{
  border-color: red;
}
</style>
