<template>
<div class="voting">
  <div v-if="glosowanie == null || currentVoting == null" class="novoting">
    Wybierz projekt z listy!
  </div>
    <div v-else id="cp" class="currentVoting">
      <h1 v-if="currentVoting.nazwa">{{currentVoting.nazwa.nazwaZwyczajowa}}</h1>
      <h2>Przegłosowane projekty<a v-tooltip="'Zaproponuj nazwę zwyczajową!'" class="offerName" target="_blank" :href="'mailto:michalwoloszyn+3buotfyq3fngqjkf5paj@boards.trello.com?subject=TUTAJ WPISZ PROPONOWANĄ NAZWĘ&body=nie kasuj tej linijki! http://wybornie.org' + $route.path"><font-awesome-icon icon="lightbulb"/></a></h2>
        <div class="project-data" v-for="project in currentVoting.projects">
          <h3>#{{project.drukNr}}</h3>
          <h3>{{project.tytul}}</h3>
          <p>{{project.opis}}</p>
          <!-- <p>{{project.deputies.length}}</p> -->
          <div class="link"><a target="_blank" :href="project.przebiegLink"><font-awesome-icon icon="bolt"/>przebieg projektu</a></div>
          <div class="link"><a target="_blank" :href="project.trescLink"><font-awesome-icon icon="file-alt"/>treść projektu</a> <a target="_blank" :href="project.drukPdfLink + '#search=UZASADNIENIE'" title="Działa wyłącznie na Mozilla Firefox"><font-awesome-icon icon="file-pdf"/>uzasadnienie</a></div>
          <div class="link"><a target="_blank" :href="project.isapLink"><font-awesome-icon icon="file"/>ISAP tekst ustawy</a></div>
          <div class="link" v-if="project.komisje"><a target="_blank" :href="project.komisje"><font-awesome-icon icon="comments"/>Komisje i podkomisje</a></div>
          <div class="link"><a target="_blank" :href="mediaLink(project.tytul)"><font-awesome-icon icon="tv"/>media o projekcie</a></div>
        </div>

        <div class="voting-data">
          <h2>Dane głosowania</h2>
          <p>{{currentVoting.status}} {{votingTime.calendar().toLowerCase()}}</p>
          <p>frekwencja {{Math.floor(currentVoting.frekwencja*100)}}%</p>
          <div class="link"><a target="_blank" :href="currentVoting.votingLink"><font-awesome-icon icon="check-square"/>decydujące głosowanie</a></div>
        </div>

        <div id="ocena">
          <h3 style="text-align: center">Jak oceniasz ten projekt?</h3>
        </div>
        <div id="button-container">
          <div :class="['vote-button', 'green', {'button-voted': currentVotingVote > 0}]" @click="userVote(true)">
            <font-awesome-icon icon="thumbs-up"/>
          </div>
          <div :class="['vote-button', 'grey', {'button-voted': currentVotingVote === undefined || currentVotingVote === 0}]" @click="userVote(null)">
            <font-awesome-icon icon="question"/>
          </div>
          <div :class="['vote-button', 'red', {'button-voted': currentVotingVote < 0}]" @click="userVote(false)">
            <font-awesome-icon icon="thumbs-down"/>
          </div>
        </div>

        <div v-if="currentVoting.frekwencja" id="svg-container">
          <svg id="deputies-graph" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 220 130">
            <text text-anchor="middle" dominant-baseline="hanging" x="0" y="0" font-family="mono" font-weight="bold" font-size="10" stroke="none" fill="black">{{currentVoting.drukNr}}</text>
            <g>
              <deputy v-for="(deputy, index) in currentVoting.deputies" :singleDeputy='deputy' :cx="placeX(index)" :cy="placeY(index)" :i="index"></deputy>
            </g>
            <g>
              <text x='5' y='125' font-size="8" stroke-width="5" stroke-linejoin="bevel" stroke-linecap="round" stroke="darkorchid" fill="white">Wstrzymał się</text>
              <text x='5' y='125' font-size="8" stroke="none" fill="white">Wstrzymał się</text>

              <text x='73' y='125' font-size="8" stroke-width="5" stroke-linejoin="bevel" stroke-linecap="round" stroke="black" fill="white">Nieobecny</text>
              <text x='73' y='125' font-size="8" stroke="none" fill="white">Nieobecny</text>

              <text x='130' y='125' font-size="8" stroke-width="5" stroke-linejoin="bevel" stroke-linecap="round" stroke="green" fill="white">Zgodny</text>
              <text x='130' y='125' font-size="8" stroke="none" fill="white">Zgodny</text>

              <text x='174' y='125' font-size="8" stroke-width="5" stroke-linejoin="bevel" stroke-linecap="round" stroke="red" fill="white">Niezgodny</text>
              <text x='174' y='125' font-size="8" stroke="none" fill="white">Niezgodny</text>
            </g>
          </svg>
        </div>
        <div v-else>
          <h2>Brak imiennych wyników głosowania!</h2>
        </div>

  </div>

</div>
</template>

<script>
import Deputy from '@/components/Deputy'

export default {
  name: 'voting',
  props: ['kadencja', 'posiedzenie', 'glosowanie'],
  data () {
    return {
      s1: 10 // ilość osób w kolumnie
      // currentVoting: null
    }
  },
  components: {
    Deputy
  },
  mounted () {
    // this.$store.commit('', this.$route.params.projekt)
    console.log(this.currentVoting)
    if (this.currentVoting === undefined) {
      this.fetchVoting()
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        this.userVote(true)
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        this.userVote(false)
      }
    })
  },
  updated () {
    document.querySelector('#scrollable-container').scrollTo({top: document.querySelector('.router-link-exact-active').offsetTop - document.querySelector('.router-link-exact-active').clientHeight, behavior: 'smooth'})
  },
  watch: {
    '$route': function () {
      if (this.currentVoting === undefined) {
        this.fetchVoting()
      }
      document.querySelector('.voting').scrollTo({top: 0, behavior: 'smooth'})
    }
  },
  computed: {
    votingTime () {
      return this.moment(new Date(this.currentVoting.votingDate))
    },
    currentVotingVote () {
      return this.$store.state.userVotes[`${this.$route.params.kadencja}/${this.$route.params.posiedzenie}/${this.$route.params.glosowanie}`]
    },
    userVotes () {
      return this.$store.state.userVotes
    },
    currentVoting () {
      return this.$store.getters.currentVoting(`${this.$route.params.kadencja}/${this.$route.params.posiedzenie}/${this.$route.params.glosowanie}`)
    }
  },
  methods: {
    userVote (vote) {
      this.$store.commit('userVote', {
        numbers: `${this.$route.params.kadencja}/${this.$route.params.posiedzenie}/${this.$route.params.glosowanie}`,
        vote: vote
      })
      document.querySelector('.voting').scrollTo({top: document.querySelector('#ocena').offsetTop, behavior: 'smooth'})
    },
    placeX (x) {
      let result = 110 + -Math.cos((Math.floor(x / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((x % this.s1) + 18) * (Math.PI / 70)) * 150
      return result
    },
    placeY (y) {
      let result = 5 + Math.sin((Math.floor(y / this.s1) * this.s1) * (Math.PI / 450)) * Math.cos(((y % this.s1) + 18) * (Math.PI / 70)) * 150
      return result
    },
    fetchVoting () {
      this.$store.commit('loadingUp')
      this.$http.get(this.$store.state.domain + ':3000/dev/glosowania/' + `${this.$route.params.kadencja}/${this.$route.params.posiedzenie}/${this.$route.params.glosowanie}`).then(response => {
        // this.currentVoting = this.adjustVotes(response.body)
        this.$store.commit('cacheVoting', { numbers: `${this.$route.params.kadencja}/${this.$route.params.posiedzenie}/${this.$route.params.glosowanie}`, data: response.body })
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
    },
    mediaLink (tytul) {
      let result = ''
      try {
        result = 'https://encrypted.google.com/search?q=' + tytul.replace(/ /g, '+').replace(/"/g, '') + '&tbm=nws'
      } catch (e) {}
      if (this.currentVoting.nazwa) {
        result = 'https://encrypted.google.com/search?q=' + this.currentVoting.nazwa.nazwaZwyczajowa
      }
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .voting {
    display: flex;
    background: #444;
    color: #eee;
    width: 100%;
    padding: 5vmin;
  }
  .novoting {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .project-data{
    color: black;
    background: white;
    padding: 2vmin;
    margin: 2vmin 0;
    border-radius: 1vmin;
  }
  .project-data svg, .voting-data svg {
    margin-right: 0.5em;
  }
  .link > a {
    display: flex;
    align-items: center;
  }
  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 1vmin;
    background-color: #eee;
    margin: .5em 0;
    padding: .2em .5em;
    text-transform: uppercase;
  }
  .offerName{
    font-size: 75%;
  }
  .voting-data p {
    font-weight: bold;
    font-size: 150%;
  }
  h1, h2, h3 {
    /* text-decoration: underline; */
    /* line-height: 1.5em; */
    padding-bottom: 0.5em;
    border-bottom: 0.1em solid #ddd;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  #button-container {
    margin: 5vh 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-content: space-around;
    align-items: flex-end;
    height: 16vmin;
    user-select: none;
  }
  .vote-button {
    border-radius: 1vmin;
    width: 15vmin;
    height: 15vmin;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: 0.1s;
    color: white;
    border: 0.3vmin solid black;
    border-bottom: 1vmin solid black;
    filter: brightness(0.9);
  }
  .button-voted {
    filter: none;
    border-bottom: 0.3vmin solid black;
  }
  .red {
    background-color: red;
  }
  .green{
    background-color: green;
  }

  .vote-button svg {
    width: 7vmin;
    height: 7vmin;
    stroke: white;
  }

  #deputies {
    flex-wrap: wrap;
    display: flex;
    list-style: none;
  }

  svg#deputies-graph {
    width: 100%;
    user-select: none;
  }

  .currentVoting {
    /* display: flex;
    justify-content: center;
    flex-direction: column; */
    width: 100%;
  }

  @media screen and (max-device-aspect-ratio: 1/1) {
    .voting{
      width: 100vw;
    }
    svg#deputies-graph {
      height: 55vmin;
    }
  }
  @media screen and (min-device-aspect-ratio: 1/1) {
    .voting{
      height: 100vh;
      overflow-y: scroll;
    }
  }
</style>
