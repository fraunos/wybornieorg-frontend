<template>
<div id="cp" class="currentProject">

  <div id="data">
    {{userVotes}}
    <h3>{{currentProject.tytul}}</h3>
    <p>{{currentProject.status}}</p>
    <p>{{currentProject.drukNr}}</p>

    <p><a :href="currentProject.tresc">treść ustawy</a></p>
    <p><a :href="currentProject.przebieg">przebieg projektu</a></p>
    <p><a :href="currentProject.votingLink">decydujące głosowanie</a></p>
    <!-- <p>{{currentProject.votingData}}</p> -->
    <!-- <p>{{currentProject.groupLinks}}</p> -->
  </div>
  <div id="buttons">
    <button type="button" name="voteFor" v-on:click="userVote('Za')"><thumbs-up-icon></thumbs-up-icon></button>
    <button type="button" name="voteAgainst" v-on:click="userVote('Przeciw')"><thumbs-down-icon></thumbs-down-icon></button>
  </div>

  <!-- <ul id="deputies">
    <li v-for='deputy in currentProject.deputies'>
      <deputy :singleDeputy='deputy'></deputy>
    </li>
  </ul> -->
<svg class="deputies" xmlns="http://www.w3.org/2000/svg">
  <g>
    <deputy v-for="(deputy, index) in currentProject.deputies" :singleDeputy='deputy' :cx="placeX(index)" :cy="placeY(index)"></deputy>
  </g>

</svg>
</div>
</template>

<script>
import { ThumbsUpIcon, ThumbsDownIcon } from 'vue-feather-icons'
import Deputy from '@/components/Deputy'

export default {
  data () {
    return {
      z1: 1,
      z2: 1,
      z3: 1,
      z4: 1,
      s1: 32
    }
  },
  components: {
    Deputy, ThumbsUpIcon, ThumbsDownIcon
  },
  computed: {
    userVotes () {
      return this.$store.state.userVotes
    },
    currentProject () {
      return this.$store.state.currentProject
    }

  },
  methods: {
    userVote (vote) {
      if (this.$store.state.currentProject.drukNr !== undefined) {
        this.$store.commit('userVote', vote)
        this.$forceUpdate()
      }
    },
    placeX (x) {
      let result = 450 + (Math.cos((x) * (Math.PI / this.s1)) * (10 * (Math.floor(x / this.s1) + 15))) * (Math.pow(-1, Math.floor(x / this.s1)))
      return result
    },
    placeY (y) {
      let result = 450 - (Math.sin((y) * (Math.PI / this.s1)) * (10 * (Math.floor(y / this.s1) + 15))) * (Math.pow(-1, Math.floor(y / this.s1)))
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cp {
  flex-flow: column;
  /*flex-basis: 70%;*/
}
#buttons{
  flex-direction: row;
  justify-content: center;
}
button{
  border-radius: 100%;
  width: 48px;
}

#deputies {
  flex-wrap: wrap;
  display: flex;
  list-style: none;
}
svg.deputies{
  width: auto;
  height: 1000px;
}
</style>
