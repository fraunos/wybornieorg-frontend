<template>
<div id="cp" class="currentProject">
  <div v-if="loading" class="loading">
    Ładowanie...
  </div>
   <!-- && !loading -->
  <div v-if="currentProject" class="">
    <div class="svg-container">
      <!-- <p>Druk {{currentProject.drukNr}}</p> -->

      <svg class="deputies-graph" :style="{height: size / 2.5 + 'px'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
          <deputy v-for="(deputy, index) in currentProject.deputies" :singleDeputy='deputy' :cx="placeX(index)" :cy="placeY(index)" :i="index"></deputy>
        </g>
      </svg>
    </div>
    <div id="buttons">
      <div @click="userVote('Za')"><thumbs-up-icon></thumbs-up-icon></div>
      <div @click="userVote('Przeciw')"><thumbs-down-icon></thumbs-down-icon></div>
    </div>
    <div id="data">
      <!-- {{userVotes}} -->
      <p>Druk nr {{currentProject.drukNr}}</p>
      <h3>{{currentProject.tytul}}</h3>
      <p>{{currentProject.status}} {{new Date(currentProject.votingData.votingDate).toLocaleString()}}</p>
      <p>{{currentProject.opis}}</p>
      <p>Frekwencja {{Math.floor(currentProject.frekwencja*100)}}%</p>

      <p><a target="_blank" :href="currentProject.trescLink">adres projektu</a> <a target="_blank" :href="currentProject.drukPdfLink + '#search=UZASADNIENIE'">(uzasadnienie)</a></p>
      <p><a target="_blank" :href="currentProject.isapLink">ISAP tekst ustawy</a></p>
      <p><a target="_blank" :href="currentProject.przebiegLink">przebieg projektu</a></p>
      <p><a target="_blank" :href="currentProject.votingLink">decydujące głosowanie</a></p>
      <p><a target="_blank" :href="mediaLink">media o projekcie</a></p>

    </div>

  </div>

</div>
</template>

<script>
import { ThumbsUpIcon, ThumbsDownIcon } from 'vue-feather-icons'
import Deputy from '@/components/Deputy'

export default {
  data () {
    return {
      s1: 10, // ilość osób w kolumnie
      loading: false,
      currentProject: null,
      size: window.innerWidth * 0.8
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
      let result = this.size / 2 - Math.cos((Math.floor(x / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((x % this.s1) + 18) * (Math.PI / 70)) * (this.size / 2)
      return result
    },
    placeY (y) {
      let result = 15 + Math.sin((Math.floor(y / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((y % this.s1) + 18) * (Math.PI / 70)) * (this.size / 2)
      return result
    },
    fetchProject () {
      this.loading = true

      this.$http.get('http://wybornie.org:3000/dev/projekty/' + this.$route.params.projekt).then(response => {
        this.currentProject = response.body
        this.loading = false
      }, response => {
        // error callback
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
  position: relative;
  top: -5vw;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80vw;
  height: 5vh;
}
#buttons div{
  border-radius: 100%;
  width: 15vmin;
  height: 15vmin;
  background: cornflowerblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 10vw;
  user-select: none;
  cursor: pointer;
}
#buttons svg {
  transform: scale(2);
}
#deputies {
  flex-wrap: wrap;
  display: flex;
  list-style: none;
}
svg.deputies-graph{
  width: 100%;
  /*height: 500px;*/
  /*background: ;*/
}
.svg-container{
  /*height: 200px;*/
  transform: scale(1);
}
.loading {
  padding: 1em;
  position: fixed;
  width: 10em;
  top: calc(50vh);
  left: calc(50vw - 10em / 2);
  background: midnightblue;
  color: white;
  z-index: 99;
  /*animation: rotate 2s infinite;*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.currentProject{
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
}
</style>
