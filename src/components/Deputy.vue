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

let votingValues = {
  'Za': 1,
  'Przeciw': -1,
  'Nieobecny': 0,
  'Wstrzymał się': 0
}

export default {
  props: ['singleDeputy', 'userVoteCurrent'],
  data () {
    return {}
  },
  computed: {
    voteValue: function () {
      return votingValues[this.singleDeputy.vote]
    },
    zgodnosc: function () {
      if (votingValues[this.userVoteCurrent] === 0) return
      return votingValues[this.userVoteCurrent] === this.voteValue
    },
    imgURL: function () {
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
    fetchIMG: function () {
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
