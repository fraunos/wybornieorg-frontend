<template>
<g>
  <g v-if="show">
    <text :x="cx+20" :y="cy" font-family="Sans" font-size="35">
      {{singleDeputy.name}}
    </text>
    <text :x="cx+20" :y="cy+40" font-family="Sans" font-size="35">
      {{singleDeputy.vote}}
    </text>
    <text :x="cx+20" :y="cy+80" font-family="Sans" font-size="35">
      {{singleDeputy.group}}
    </text>
  </g>
  <circle :cx='cx' :cy='cy' :r="5" :class="[zgodnosc ? 'zgodny' : 'niezgodny']" @click='show=!show' />

</g>
</template>

<script>
const $ = require('jquery')

export default {
  props: ['singleDeputy', 'cx', 'cy'],
  data () {
    return {
      r: 5,
      show: false
    }
  },
  computed: {
    zgodnosc () {
      // console.log(`${this.$store.state.userVotes[this.$store.state.currentProject.drukNr]} ${this.singleDeputy.vote}`)
      let result = this.$store.state.userVotes[this.$store.state.currentProject.drukNr] === this.singleDeputy.vote
      this.$store.commit('setDeputyStat', {
        deputy: this.singleDeputy,
        vote: result
      })
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

.zgodny {
  fill: green;
}

.niezgodny {
  fill: red;
}
circle {
  stroke: none;
  fill: grey;
}
circle:hover {
    -webkit-transform: perspective(17px);
  }

  /*.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}*/
</style>
