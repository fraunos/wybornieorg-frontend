<template>
<div v-if="currentProject" id="cp" class="currentProject">


    <div id="data">
      <p>Druk nr {{currentProject.drukNr}}</p>
      <h3>{{currentProject.tytul}}</h3>
      <p>{{currentProject.status}} {{votingTime.calendar().toLowerCase()}}</p>
      <p>{{currentProject.opis}}</p>
      <!-- <p>{{currentProject.deputies.length}}</p> -->
      <p>Frekwencja {{Math.floor(currentProject.frekwencja*100)}}%</p>

      <p><a target="_blank" :href="currentProject.przebiegLink">przebieg projektu</a></p>
      <p><a target="_blank" :href="currentProject.trescLink">treść projektu</a> <a target="_blank" :href="currentProject.drukPdfLink + '#search=UZASADNIENIE'">(uzasadnienie)</a></p>
      <p><a target="_blank" :href="currentProject.isapLink">ISAP tekst ustawy</a></p>
      <p><a target="_blank" :href="currentProject.votingLink">decydujące głosowanie</a></p>
      <p><a target="_blank" :href="mediaLink">media o projekcie</a></p>
    </div>

    <div id="ocena">
      <h3 style="text-align: center">Jak oceniasz ten projekt?</h3>
    </div>
    <div id="button-container">
      <div :class="['vote-button', 'green', {'button-voted': currentProjectVote === 'Za'}]" @click="userVote('Za')">
        <thumbs-up-icon></thumbs-up-icon>
      </div>
      <div :class="['vote-button', 'red', {'button-voted': currentProjectVote === 'Przeciw'}]" @click="userVote('Przeciw')">
        <thumbs-down-icon></thumbs-down-icon>
      </div>
    </div>

    <div id="svg-container">
      <svg id="deputies-graph" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -5 1 140">
        <text text-anchor="middle" dominant-baseline="hanging" x="0" y="0" font-family="mono" font-weight="bold" font-size="10" stroke="none" fill="black">{{currentProject.drukNr}}</text>
        <g>
          <deputy v-for="(deputy, index) in currentProject.deputies" :singleDeputy='deputy' :cx="placeX(index)" :cy="placeY(index)" :i="index"></deputy>
        </g>
      </svg>
    </div>

</div>
</template>

<script>
import {
  ThumbsUpIcon,
  ThumbsDownIcon
} from 'vue-feather-icons'
import Deputy from '@/components/Deputy'

export default {
  name: 'current-project',
  data () {
    return {
      s1: 10, // ilość osób w kolumnie
      currentProject: null
    }
  },
  components: {
    Deputy,
    ThumbsUpIcon,
    ThumbsDownIcon
  },
  mounted () {
    // this.$store.commit('', this.$route.params.projekt)
    this.fetchProject()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchProject'
  },
  computed: {
    votingTime () {
      return this.moment(new Date(this.currentProject.votingDate))
    },
    currentProjectVote () {
      return this.$store.state.userVotes[JSON.stringify({drukNr: this.$route.params.druk, kadencja: this.$route.params.kadencja})]
    },
    mediaLink () {
      let result = ''
      try {
        result = 'https://encrypted.google.com/search?q=' + this.currentProject.tytul.replace(/ /g, '+').replace(/"/g, '') + '&tbm=nws'
      } catch (e) {} finally {}
      return result
    }
  },
  methods: {
    userVote (vote) {
      this.$store.commit('userVote', {
        drukNr: this.$route.params.druk,
        kadencja: this.$route.params.kadencja,
        vote: vote
      })
      setTimeout(() => {
        window.scrollTo({top: document.querySelector('#ocena').offsetTop, behavior: 'smooth'})
      }, 1000)
    },
    placeX (x) {
      let result = -Math.cos((Math.floor(x / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((x % this.s1) + 18) * (Math.PI / 70)) * 150
      return result
    },
    placeY (y) {
      let result = Math.sin((Math.floor(y / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((y % this.s1) + 18) * (Math.PI / 70)) * 150
      return result
    },
    fetchProject () {
      this.$store.commit('loadingUp')
      this.$http.get(this.$store.state.domain + ':3000/dev/projekty/' + this.$route.params.kadencja + '/' + this.$route.params.druk).then(response => {
        this.currentProject = this.adjustVotes(response.body)
        this.$store.commit('loadingDown')
      }, response => {
        // error callback
      })
    },
    adjustVotes (project) {
      if ((project.votingIntention === 'odrzucenie')) {
        for (let deputy of project.deputies) {
          deputy.vote = this.switchVote(deputy.vote)
        }
      }
      return project
    },
    switchVote (vote) {
      if (vote === 'Za') {
        return 'Przeciw'
      } else if (vote === 'Przeciw') {
        return 'Za'
      } else {
        return vote
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cp {
  /*flex-flow: column;*/
  display: flex;
  /*flex-basis: 70%;*/
}
#data {
  width: 100%;
}
#button-container {
  margin: 5vh 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
  align-items: flex-end;
  height: 16vmin;
  /*width: 80vw;*/
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}

.vote-button {
  border-radius: 1vmin;
  width: 15vmin;
  height: 15vmin;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*margin: 0 10vw;*/
  user-select: none;
  cursor: pointer;
  transition: 0.1s;
  opacity: 0.8;
  color: white;
  border: 0.3vmin solid black;
  border-bottom: 1vmin solid black;
}
.button-voted {
  opacity: 1;
  border-bottom: 0.3vmin solid black;
  /*transform: scale(1.1);*/
}

.red {
  background-color: red;
}

.green{
  background-color: green;
}
/*.vote-button:hover {
  background: var(--color-4);
  color: white;
}*/

.vote-button:active {
  /*background: var(--color-1);*/
  opacity: 0.7;
}

.vote-button svg {
  transform: scale(2);
}

#deputies {
  flex-wrap: wrap;
  display: flex;
  list-style: none;
}

svg#deputies-graph {
  width: 100%;
  height: 35vw;
  /*background: black;*/
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}

.svg-container {
  /*animation: rotate ease-out 3s alternate;*/
  /*transform-origin: 50% 0%;*/
  /*transform: rotate(360deg);*/
  /*transition: 1s;*/
}

.currentProject {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  20%{
    transform: rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
