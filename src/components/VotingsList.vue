<template>
  <div class="voting-menu">
    <popup v-if="dbUpdate" @close="dbUpdate = false">
      <h1 slot="header"><font-awesome-icon icon="sync-alt" />Ups!</h1>
      <div slot="content">
        <h3>Właśnie trwa synchronizacja bazy danych <a href="wybornie.org">wybornie.org</a> ze stroną Sejmu!</h3>
         <p>Z tego powodu nie wszystkie funkcje są dostępne (brak niektórych głosowań, brak artykułów mamprawowiedziec.pl i nazw zwyczajowych). Jeśli Ci to przeszkadza, spróbuj odświeżyć stronę za 5 minut i skorzystaj kiedy przestanie się pojawiać to okno!</p>
         <strong>Nie zapomnij zapisać swoich głosów, usuną się, jeśli odświeżysz bez zapisania ich!</strong>
      </div>
    </popup>
    <div class="sort-filter-menu">
      <v-popover
        offset="16"
      >
        <div class="tooltip-target b3 glow">
          <span>{{kadencje}}</span>
        </div>

        <template slot="popover">
          <div v-for="item in [3, 4, 5, 6, 7, 8].reverse()">
            <input v-close-popover :id="'k' + item" type="radio" :value="item" v-model="kadencje">
            <label :for="'k' + item">{{item}}</label>
          </div>
        </template>
      </v-popover>

      <v-popover
        offset="16"
      >
        <div class="tooltip-target b3 glow">
          <font-awesome-icon v-if="sortowanie === 'data'" icon="calendar" />
          <font-awesome-icon v-if="sortowanie === 'frekwencja'" icon="users" />
          <font-awesome-icon v-if="sortowanieKierunek === 'rosnaco'" icon="sort-up" />
          <font-awesome-icon v-if="sortowanieKierunek === 'malejaco'" icon="sort-down" />
        </div>

        <template slot="popover">
          <div>
            <div>
              <input type="radio" id="malejaco" value="malejaco" v-model="sortowanieKierunek">
              <label for="malejaco"><font-awesome-icon icon="sort-down" />malejąco</label>
            </div>
            <div>
              <input type="radio" id="rosnaco" value="rosnaco" v-model="sortowanieKierunek">
              <label for="rosnaco"><font-awesome-icon icon="sort-up" />rosnąco</label>
            </div>
          </div>
          <div>
            <div>
              <input v-close-popover type="radio" id="data" value="data" v-model="sortowanie">
              <label for="data"><font-awesome-icon icon="calendar" />data</label>
            </div>
            <div>
              <input v-close-popover type="radio" id="frekwencja" value="frekwencja" v-model="sortowanie">
              <label for="frekwencja"><font-awesome-icon icon="users" />frekwencja</label>
            </div>
          </div>
        </template>
      </v-popover>

      <v-popover
        offset="16"
      >
        <div class="tooltip-target b3 glow"><font-awesome-icon icon="filter" /></div>

        <template slot="popover">
          <div class="filtrowanie-status">
            <div>
              <input id="uchwalonoCB" type="checkbox" value="uchwalono" v-model="filtrowanieStatus">          <label for="uchwalonoCB">uchwalone</label>
            </div>
            <div>
              <input id="odrzuconyCB" type="checkbox" value="odrzucony" v-model="filtrowanieStatus">
              <label for="odrzuconyCB">odrzucone</label>
            </div>
            <div>
              <input id="nazwane" type="checkbox" value="nazwane" v-model="filtrowanieNazwane">
              <label for="nazwane">nazwane</label>
            </div>
            <div>
              <input id="prawoUE" type="checkbox" v-model="filtrowanieUE">
              <label for="prawoUE">prawo UE</label>
            </div>
          </div>
        </template>
      </v-popover>

      <v-popover
        offset="16" @show="focusSearch"
      >
        <div class="tooltip-target b3 glow search"><font-awesome-icon icon="search" /></div>

        <template slot="popover">
          <div class="filtrowanie-nazwa">
            <input type="text" id="filtrowanieNazwa" v-model="filtrowanieNazwa" placeholder="Filtruj tytuły, np. 'podatk'">
          </div>
        </template>
      </v-popover>




      <!--

      <div class="filtrowanie-status">
        <div>
          <input id="uchwalonoCB" type="checkbox" value="uchwalono" v-model="filtrowanieStatus">
          <label for="uchwalonoCB">uchwalone</label>
        </div>
        <div>
          <input id="odrzuconyCB" type="checkbox" value="odrzucony" v-model="filtrowanieStatus">
          <label for="odrzuconyCB">odrzucone</label>
        </div>
        <div>
          <input id="nazwane" type="checkbox" value="nazwane" v-model="filtrowanieNazwane">
          <label for="nazwane">Nazwane</label>
        </div>
        <div>
          <input id="prawoUE" type="checkbox" v-model="filtrowanieUE">
          <label for="prawoUE">Wprowadza prawo UE</label>
        </div>
      </div>

      <div v-tooltip="'Wpisz dowolny tekst i szukaj'" class="filtrowanie-nazwa">
        <search-icon />
        <label for="filtrowanieNazwa"></label>
        <input type="text" name="filtrowanieNazwa" v-model="filtrowanieNazwa" placeholder="Filtruj tytuły, np. 'podatk'">
      </div> -->
      <!-- <div class="filtrowanie-glos">
        <div>
          <input id="za" type="checkbox" name="za" value="za" v-model="filtrowanieGlos">
          <label for="za">Za</label>
        </div>
        <div>
          <input id="przeciw" type="checkbox" name="przeciw" value="przeciw" v-model="filtrowanieGlos">
          <label for="przeciw">Przeciw</label>
        </div>
      </div> -->
      <div class="center nowrap">
        Σ {{votingsProcessed.length}}
      </div>
    </div>

    <div id="scrollable-container">
      <div class="voting-list" @click="$emit('hideList')">
        <votings-list-item  :id="index" v-for="(voting, index) in votingsDisplayed" :key="index" :voting='voting'></votings-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import VotingsListItem from '@/components/VotingsListItem'
import AppNav from '@/components/AppNav'
import Popup from '@/components/generic/Popup'

export default {
  name: 'votings-list',
  data () {
    return {
      votings: [],
      dbUpdate: false,
      pagination: 0,
      itemsPerPage: 10,
      listHidden: true,
      kadencje: this.$route.params.kadencja,
      sortowanie: 'data',
      filtrowanieStatus: ['odrzucony', 'uchwalono'],
      filtrowanieUE: true,
      filtrowanieNazwane: false,
      // filtrowanieGlos: ['za', 'przeciw'],
      sortowanieKierunek: 'malejaco',
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
    Popup,
    AppNav,
    VotingsListItem
  },
  computed: {
    votingsProcessed () {
      return this.votings.filter(item => {
        // return this.kadencje.indexOf(item.kadencja) !== -1
        let result = this.filtrowanieStatus.indexOf(item.status) !== -1 && item.projects.every((a) => {
          return a.tytul.toLowerCase().indexOf(this.filtrowanieNazwa.toLowerCase()) !== -1
        }) && (!this.filtrowanieNazwane || item.nazwa !== null)
        return result
      }).sort((a, b) => {
        if (this.sortowanie === 'data') {
          return new Date(b['votingDate']) - new Date(a['votingDate'])
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
        this.dbUpdate = response.body.collectorStatus
        this.votings = response.body.votings
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
      }
    },
    focusSearch () {
      setTimeout(() => {
        document.querySelector('#filtrowanieNazwa').focus()
      }, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.voting-menu {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  z-index: 40;
}
.sort-filter-menu {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-around;
  background: #333;
  color: white;
  height: 10vmin;
  font-size: 150%;
}
.sort-filter-menu > div {
  width: 10vmin;
  height: 10vmin;
  user-select: none;
}
.b3 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vmin;
  width: 10vmin;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
}
.b3 svg{
  height: 8vmin;
  width: 8vmin;
}
span{
  vertical-align: middle;
  font-size: 10vmin;
  height: 10vmin;
}
.b3 * {
  position: absolute;
}
.tooltip-inner label{
  cursor: pointer;
}
.filtrowanie-nazwa{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.filtrowanie-nazwa input{
  color: black;
  background-color: transparent;
  width: 13em;
  border: none;
}
.filtrowanie-status{
  flex-direction: column;
  align-items: flex-start;
}

input[type=radio]{
  visibility: hidden;
  position: absolute;
}
.nowrap{
  white-space: nowrap;
}

.voting-list {
  display: flex;
  flex-flow: column;
  height: calc(100vh - 10vmin);
}

#scrollable-container {
  overflow-y: scroll;
  background: #333;
}
.error{
  color: red;
  transition: none;
}

@media screen and (max-device-aspect-ratio: 1/1) {
  .voting-menu{
    position: fixed;
  }

  .tooltip-inner * {
    font-size: 5vmin;
  }
}
</style>
