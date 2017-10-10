<template>
<div id="cp" class="currentProject">

  <div id="data">
    {{userVotes}}
    <h3>{{currentProject.tytul}}</h3>
    <p>{{currentProject.status}}</p>
    <p>{{currentProject.drukNr}}</p>

    <p><a target="_blank" :href="currentProject.tresc">treść ustawy</a></p>
    <p><a target="_blank" :href="currentProject.przebieg">przebieg projektu</a></p>
    <p><a target="_blank" :href="currentProject.votingLink">decydujące głosowanie</a></p>
    <p><a target="_blank" :href="mediaLink">media o projekcie</a></p>

    <p>Frekwencja {{Math.floor(currentProject.attendance*100)}}%</p>
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
<svg class="deputies" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <deputy v-for="(deputy, index) in currentProject.deputies" :singleDeputy='deputy' :cx="placeX(index)" :cy="placeY(index)" :i="index"></deputy>
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
      s1: 32 // ilość osób w kolumnie
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
    },
    mediaLink () {
      let result = ''
      try {
        result = 'https://encrypted.google.com/search?q=' + this.currentProject.tytul.replace(/ /g, '+') + '&tbm=nws'
      } catch (e) {

      } finally {

      }
      return result
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
      let result = 450 - Math.cos(x * (Math.PI / 460)) * Math.cos(Math.floor((x % 10) + 15) * (Math.PI / 70)) * 550
      return result
    },
    placeY (y) {
      let result = 450 - Math.sin(y * (Math.PI / 460)) * Math.cos(Math.floor((y % 10) + 15) * (Math.PI / 70)) * 550
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
  width: 100%;
  height: 1000px;
  background: midnightblue;
}
</style>
