<template>
<div id="cp" class="currentProject">
  <div v-if="loading" class="loading">
    Ładowanie...
  </div>
   <!-- && !loading -->
  <div v-if="currentProject" class="">
    <svg class="deputies" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <deputy v-for="(deputy, index) in currentProject.deputies" :singleDeputy='deputy' :cx="placeX(index)" :cy="placeY(index)" :i="index"></deputy>
      </g>
    </svg>
    <div id="buttons">
      <button type="button" name="voteFor" @click="userVote('Za')"><thumbs-up-icon></thumbs-up-icon></button>
      <button type="button" name="voteAgainst" @click="userVote('Przeciw')"><thumbs-down-icon></thumbs-down-icon></button>
    </div>
    <div id="data">
      {{userVotes}}
      <h3>{{currentProject.tytul}}</h3>
      <p>{{currentProject.status}}</p>
      <p>{{currentProject.drukNr}}</p>

      <p><a target="_blank" :href="currentProject.trescLink">adres projektu</a> <a target="_blank" :href="currentProject.drukPdfLink + '#search=UZASADNIENIE'">(uzasadnienie)</a></p>
      <p><a target="_blank" :href="currentProject.isapLink">ISAP tekst ustawy</a></p>
      <p><a target="_blank" :href="currentProject.przebiegLink">przebieg projektu</a></p>
      <p><a target="_blank" :href="currentProject.votingLink">decydujące głosowanie</a></p>
      <p><a target="_blank" :href="mediaLink">media o projekcie</a></p>

      <p>Frekwencja {{Math.floor(currentProject.frekwencja*100)}}%</p>
    </div>

  </div>

</div>
</template>

<script>
import { ThumbsUpIcon, ThumbsDownIcon } from 'vue-feather-icons'
import Deputy from '@/components/Deputy'

const $ = require('jquery')

export default {
  data () {
    return {
      s1: 10, // ilość osób w kolumnie
      loading: false,
      currentProject: null
    }
  },
  components: {
    Deputy, ThumbsUpIcon, ThumbsDownIcon
  },
  created () {
    // this.$store.commit('', this.$route.params.projekt)
    this.fetchProject()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchProject'
  },
  computed: {
    userVotes () {
      return this.$store.state.userVotes
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
      if (this.currentProject.drukNr !== undefined) {
        this.$store.commit('userVote', {projectNr: this.$route.params.projekt, vote: vote})
      }
    },
    placeX (x) {
      let result = 450 - Math.cos((Math.floor(x / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((x % this.s1) + 18) * (Math.PI / 70)) * 600
      return result
    },
    placeY (y) {
      let result = 15 + Math.sin((Math.floor(y / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((y % this.s1) + 18) * (Math.PI / 70)) * 600
      return result
    },
    fetchProject () {
      this.loading = true
      // document.getElementById('cp').scrollIntoView({behavior: 'smooth'})
      $.get('http://192.168.0.47:3000/dev/projekty/' + this.$route.params.projekt)
        .done(data => {
          this.loading = false
          this.currentProject = data
        })
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
  height: 500px;
  /*background: midnightblue;*/
}
.loading {
  position: fixed;
  top: 50vh;
  left: 50vw;
  background: cornflowerblue;
}
</style>
