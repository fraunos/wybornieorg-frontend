<template>
<g>
  <title class="tooltip">{{i+1}}. {{singleDeputy.name}} {{singleDeputy.vote}} {{singleDeputy.group}}
  </title>

  <circle :cx='cx' :cy='cy' :r="dotSize" :class="koloryzuj" :id="i">
  </circle>
  <text :x="cx - dotSize * 0.45" :y="cy + dotSize * 0.5" font-family="mono" font-weight="bold" :font-size="dotSize * 1.4" stroke="none" fill="white">{{singleDeputy.name[0]}}</text>
</g>
</template>

<script>
export default {
  props: ['singleDeputy', 'cx', 'cy', 'i'],
  data () {
    return {
      r: 15,
      show: false,
      dotSize: (window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight * 1.5) / 150
    }
  },
  computed: {
    zgodnosc () {
      // console.log(`${this.$store.state.userVotes[this.$store.state.currentProject.drukNr]} ${this.singleDeputy.vote}`)
      let result = this.$store.state.userVotes[JSON.stringify({drukNr: this.$route.params.druk, kadencja: this.$route.params.kadencja})] === this.singleDeputy.vote
      this.$store.commit('setDeputyStat', {
        deputyName: this.singleDeputy.name,
        druk: this.$route.params.druk,
        kadencja: this.$route.params.kadencja,
        vote: result
      })
      return result
    },
    koloryzuj () {
      let result = ''
      if (this.singleDeputy.vote === 'Wstrzymał się' || this.singleDeputy.vote === 'Nie oddał głosu') {
        result = 'wstrzymanie'
      } else if (this.singleDeputy.vote === 'Nieobecny') {
        result = 'nieobecnosc'
      } else if (this.$store.state.userVotes[JSON.stringify({drukNr: this.$route.params.druk, kadencja: this.$route.params.kadencja})] === undefined) {} else {
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
      return
    },
    log () {
      console.log(this.singleDeputy.name)
    }
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100px;
}

.pis {
  stroke: firebrick;
}

.po {
  stroke: gold;
}

.kukiz {
  stroke: black;
}

.nowoczesna {
  stroke: blue;
}

.psl {
  stroke: green;
}

.zgodny {
  fill: green;
}

.niezgodny {
  fill: red;
}

.nieobecnosc {
  fill: #111;
}

.wstrzymanie {
  fill: darkorchid;
}

circle {
  stroke: none;
  stroke-width: 2;
  transition: 0.5s;
  fill: black;
}


/*circle:hover {
  transform: scale(1.2, 1.2);
}*/

title {
  font-size: 24px;
}
</style>
