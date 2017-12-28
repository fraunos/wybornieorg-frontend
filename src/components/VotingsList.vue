<template>
  <div class="voting-menu">
    <div class="sort-filter-menu">
      <div class="">
        <layers-icon />
        <select v-model="kadencje">
         <option v-for="item in [3, 4, 5, 6, 7, 8].reverse()" :value="item">{{item}}</option>
        </select>
      </div>
      <div class="">
        <bar-chart-icon />
        <select v-model="sortowanie">
          <option value="votingDate">Najnowsze</option>
          <option value="frekwencja">Z najw. frekwencją</option>
        </select>
      </div>
      <div class="filtrowanie-status">
        <filter-icon />
        <div class="">
          <input id="uchwalonoCB" type="checkbox" name="uchwalono" value="uchwalono" v-model="filtrowanieStatus">
          <label for="uchwalonoCB">Uchwalone</label>
        </div>
        <div class="">
          <input id="odrzuconyCB" type="checkbox" name="" value="odrzucony" v-model="filtrowanieStatus">
          <label for="odrzuconyCB">Odrzucone</label>
        </div>
        <!-- <div class="">
          <input id="prawoUE" type="checkbox" name="" v-model="filtrowanieUE">
          <label for="prawoUE">Wprowadza prawo UE</label>
        </div> -->
      </div>
      <div class="filtrowanie-nazwa">
        <search-icon />
        <label for="filtrowanieNazwa"></label>
        <input type="text" name="filtrowanieNazwa" v-model="filtrowanieNazwa" placeholder="Filtruj tytuły, np. 'podatk'">
      </div>
      <!-- <div class="filtrowanie-glos">
        <div class="">
          <input id="za" type="checkbox" name="za" value="za" v-model="filtrowanieGlos">
          <label for="za">Za</label>
        </div>
        <div class="">
          <input id="przeciw" type="checkbox" name="przeciw" value="przeciw" v-model="filtrowanieGlos">
          <label for="przeciw">Przeciw</label>
        </div>
      </div> -->
      <!-- <div class="">
        Liczba projektów: {{votingsProcessed.length}}
      </div> -->
    </div>

    <div id="scrollable-container">
      <div class="voting-list" @click="$emit('hideList')">
        <votings-list-item  :id="index" v-for="(voting, index) in votingsDisplayed" :key="index" :voting='voting'></votings-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LayersIcon,
  BarChartIcon,
  FilterIcon,
  ListIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon
} from 'vue-feather-icons'
import VotingsListItem from '@/components/VotingsListItem'
import AppNav from '@/components/AppNav'

export default {
  name: 'votings-list',
  data () {
    return {
      votings: [],
      pagination: 0,
      itemsPerPage: 10,
      listHidden: true,
      kadencje: this.$route.params.kadencja,
      sortowanie: 'votingDate',
      filtrowanieStatus: ['odrzucony', 'uchwalono'],
      filtrowanieUE: true,
      // filtrowanieGlos: ['za', 'przeciw'],
      filtrowanieNazwa: ''
    }
  },
  watch: {
    'kadencje': function () {
      this.$router.push({ name: 'voting', params: { kadencja: this.kadencje } })
      this.fetchVotings(this.kadencje)
    },
    'votingsProcessed': function () {
      this.pagination = 0
      document.querySelector('#scrollable-container').scrollTop = 0
    }
  },
  components: {
    LayersIcon,
    AppNav,
    VotingsListItem,
    BarChartIcon,
    FilterIcon,
    ListIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    SearchIcon
  },
  computed: {
    votingsProcessed () {
      return this.votings.filter(item => {
        // return this.kadencje.indexOf(item.kadencja) !== -1
        return this.filtrowanieStatus.indexOf(item.status) !== -1 && item.projects.every((a) => {
          return a.tytul.toLowerCase().indexOf(this.filtrowanieNazwa.toLowerCase()) !== -1
        })
      }).sort((a, b) => {
        if (this.sortowanie === 'votingDate') {
          return new Date(b[this.sortowanie]) - new Date(a[this.sortowanie])
        } else {
          return b[this.sortowanie] - a[this.sortowanie]
        }
      })
    },
    votingsDisplayed () {
      return this.votingsProcessed.slice(0, 10 + 10 * this.pagination)
    },
    userVotes () {
      return this.$store.state.userVotes
    }
  },
  mounted () {
    if (this.kadencje === undefined) {
      this.kadencje = 8
    } else {
      this.fetchVotings(this.kadencje)
    }

    document.querySelector('#scrollable-container').addEventListener('scroll', (el) => {
      if (el.target.scrollTop / (el.target.scrollHeight - el.target.clientHeight) > 0.9) {
        this.pagination++
      }
    })
    document.addEventListener('voteSwitch', (ev) => {
      this.switchVoting(ev.detail)
    })
  },
  methods: {
    fetchVotings (kadencja) {
      this.$store.commit('loadingUp')
      this.$http.get(this.$store.state.domain + ':3000/dev/glosowania/' + kadencja).then(response => {
        this.$store.commit('loadingDown')
        this.votings = response.body
      }, response => {
        // error callback
      })
    },
    hideList () {
      this.listHidden = true
    },
    switchVoting (state) {
      let self = this

      let currentVotingIndex = self.votingsProcessed.findIndex((item) => {
        return item.numbers.kadencja === parseInt(self.$route.params.kadencja) && item.numbers.posiedzenie === parseInt(self.$route.params.posiedzenie) && item.numbers.glosowanie === parseInt(self.$route.params.glosowanie)
      })

      try {
        self.$router.push({
          name: 'voting',
          params: {
            kadencja: self.votingsProcessed[currentVotingIndex + state].numbers.kadencja,
            posiedzenie: self.votingsProcessed[currentVotingIndex + state].numbers.posiedzenie,
            glosowanie: self.votingsProcessed[currentVotingIndex + state].numbers.glosowanie
          }
        })
      } catch (e) {
        document.querySelector('.strzalka').classList.add('error')
        setTimeout(() => {
          document.querySelector('.strzalka').classList.remove('error')
        }, 200)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.voting-menu {
  display: flex;
  flex-direction: column;
  background: maroon;
  width: 100vw;
  height: 100vh;
  background: var(--color-1-op);
  z-index: 40;
}
.sort-filter-menu {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-between;
  background: maroon;
  height: 10vmin;
}
.sort-filter-menu > * {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.filtrowanie-nazwa{
}
.filtrowanie-nazwa input{
  background-color: white;
  /*width: 90px;*/
  font-size: 2vmin;
  border: none;
}
.filtrowanie-status{
  flex-direction: column;
  align-items: flex-start;
}

select {
  border-radius: 0.5vmin;
  background: var(--color-3);
  font-size: inherit;
}

.voting-list {
  display: flex;
  flex-flow: column;
  height: calc(100vh - 10vmin);
}

.guziki {
  position: fixed;
  top: 0;
  left: 0;
  /*width: 100vw;*/
  /*height: 100vh;*/
}

.guziki * {
  background-color: midnightblue;
  color: white;
  transition: 1s;
}
#scrollable-container {
  /*position: relative;*/
  /*max-height: 90vh;*/
  overflow-y: scroll;
}

#fold-button {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 7vmin solid transparent;
  border-bottom: 7vmin solid transparent;

  border-right: 7vmin solid var(--color-0);
  /*border-left:5vmin solid var(--color-0);*/
  /*background: var(--color-0);*/
  top: calc(50vh - 3.5vmin);
  left: calc(100vmin + 1vmin);

  /*border-radius: 100%;*/
  opacity: 0.7;
  transition: opacity 0.5s;
  cursor: pointer;
}

#fold-button:hover {
  opacity: 1;
}
.strzalka{
  transition: 1s;
}
.error{
  color: red;
  transition: none;
}

@media screen and (max-device-aspect-ratio: 1/1) {
  .voting-menu{
    position: fixed;
  }
}
</style>
