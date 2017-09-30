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
        <!-- <set attributeName="visibility" from="hidden" to="visible" begin="thingyouhoverover.mouseover" end="thingyouhoverover.mouseout"/> -->
  </g>
  <circle :cx='cx' :cy='cy' :r="5" :class="koloryzuj" @click='show=!show'>
  </circle>
  <!-- <text :x="cx+20" :y="cy" font-family="Sans" font-size="10" stroke="none" fill="white">{{i}}</text> -->
</g>
</template>

<script>
const $ = require('jquery')

export default {
  props: ['singleDeputy', 'cx', 'cy', 'i'],
  data () {
    return {
      r: 10,
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
    },
    koloryzuj () {
      let result = ''
      if (this.singleDeputy.vote === 'Wstrzymał się') {
        result = 'wstrzymanie'
      } else if (this.singleDeputy.vote === 'Nieobecny') {
        result = 'nieobecnosc'
      } else {
        result = this.zgodnosc ? 'zgodny' : 'niezgodny'
      }
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
  transition: 1s;
}

.niezgodny {
  fill: crimson;
  transition: 1s;
}
.nieobecnosc {
  fill: darkslategray;
  transition: 1s;
}
.wstrzymanie {
  fill: darkorchid;
  transition: 1s;
}
text {
  stroke: red;
}
circle {
  stroke: none;
  fill: black;
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
