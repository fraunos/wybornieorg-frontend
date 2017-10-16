<template>
<g>

  <title class="tooltip">{{i+1}}. {{singleDeputy.name}}
{{singleDeputy.vote}}
{{singleDeputy.group}}
</title>
  <circle :cx='cx' :cy='cy' :r="dotSize" :class="koloryzuj" :id="i">
  </circle>
  <!-- <text :x="cx" :y="cy" font-family="Sans" font-size="10" stroke="none" fill="white">{{i+1}}</text> -->
</g>
</template>

<script>
const $ = require('jquery')
export default {
  props: ['singleDeputy', 'cx', 'cy', 'i'],
  data () {
    return {
      r: 15,
      show: false,
      dotSize: window.innerWidth / 200
    }
  },
  computed: {
    zgodnosc () {
      // console.log(`${this.$store.state.userVotes[this.$store.state.currentProject.drukNr]} ${this.singleDeputy.vote}`)
      let result = this.$store.state.userVotes[this.$route.params.projekt] === this.singleDeputy.vote
      this.$store.commit('setDeputyStat', {
        deputy: this.singleDeputy,
        projectNr: this.$route.params.projekt,
        vote: result
      })
      return result
    },
    koloryzuj () {
      let result = ''
      if (this.singleDeputy.vote === 'Wstrzymał się') {
        result = 'wstrzymanie'
      } else if (this.singleDeputy.vote === 'Nieobecny') {
        result = 'nieobecnosc'
      } else if (this.$store.state.userVotes[this.$route.params.projekt] === undefined) {
      } else {
        result = this.zgodnosc ? 'zgodny' : 'niezgodny'
      }
      // if (this.singleDeputy.group === 'PiS') {
      //   result += ' pis'
      // } else if (this.singleDeputy.group === 'PO') {
      //   result += ' po'
      // } else if (this.singleDeputy.group === 'Kukiz15') {
      //   result += ' kukiz'
      // } else if (this.singleDeputy.group === 'N') {
      //   result += ' nowoczesna'
      // } else if (this.singleDeputy.group === 'PSL') {
      //   result += ' psl'
      // }
      return result
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
    },
    log () {
      console.log(this.singleDeputy.name)
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
.pis{
  stroke: firebrick;
}
.po{
  stroke: gold;
}
.kukiz{
  stroke: black;
}
.nowoczesna{
  stroke: blue;
}
.psl{
  stroke: green;
}
.zgodny {
  fill: green;
  transition: 1s;
}
.niezgodny {
  fill: red;
  transition: 1s;
}
.nieobecnosc {
  fill: #111;
  transition: 1s;
}
.wstrzymanie {
  fill: darkorchid;
  transition: 1s;
}
circle {
  stroke: none;
  stroke-width: 2;
  fill: black;
}
/*circle:hover {
  transform: scale(1.2, 1.2);
}*/
title {
  font-size: 24px;
}
</style>
