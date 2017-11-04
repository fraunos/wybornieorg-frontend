<template>
<div :class="['voting-menu', {'list-hidden':listHidden}]">
  <div id="fold-button" @click="listHidden=!listHidden"></div>
  <div class="sort-filter-menu">
    <div class="">
      <layers-icon></layers-icon>
      <select v-model="kadencje">
       <option v-for="item in [3, 4, 5, 6, 7, 8].reverse()" :value="item">Kadencja {{item}}</option>
      </select>
    </div>
    <div class="">
      <bar-chart-icon></bar-chart-icon>
      <select v-model="sortowanie">
        <option value="votingDate">Najnowsze</option>
        <option value="frekwencja">Z największą frekwencją</option>
      </select>
    </div>
    <div class="filtrowanie-status">
      <filter-icon></filter-icon>
      <div class="">
        <input id="uchwalonoCB" type="checkbox" name="uchwalono" value="uchwalono" v-model="filtrowanieStatus">
        <label for="uchwalonoCB">Uchwalone</label>
      </div>
      <div class="">
        <input id="odrzuconyCB" type="checkbox" name="" value="odrzucony" v-model="filtrowanieStatus">
        <label for="odrzuconyCB">Odrzucone</label>
      </div>
    </div>
    <div class="filtrowanie-nazwa">
      <search-icon></search-icon>
      <label for="filtrowanieNazwa"></label>
      <input type="text" name="filtrowanieNazwa" value="" v-model="filtrowanieNazwa" placeholder="Filtruj tytuły, np. 'podatk'">
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
    <div class="">
      Liczba projektów: {{votingsProcessed.length}}
    </div>
  </div>

  <div id="scrollable-container">
    <div class="voting-list" @click="hideList()">
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
  SearchIcon
} from 'vue-feather-icons'
import VotingsListItem from '@/components/VotingsListItem'

export default {
  name: 'votings-list',
  data () {
    return {
      votings: [],
      pagination: 0,
      itemsPerPage: 10,
      listHidden: true,
      kadencje: 8,
      sortowanie: 'votingDate',
      filtrowanieStatus: ['odrzucony', 'uchwalono'],
      // filtrowanieGlos: ['za', 'przeciw'],
      filtrowanieNazwa: ''
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'hideList',
    'votingsProcessed': function () {
      this.pagination = 0
      document.getElementById('scrollable-container').scrollTop = 0
    }
  },
  components: {
    LayersIcon,
    VotingsListItem,
    BarChartIcon,
    FilterIcon,
    SearchIcon
  },
  computed: {
    votingsProcessed () {
      return this.votings.filter(item => {
        // return this.kadencje.indexOf(item.kadencja) !== -1
        return this.kadencje === item.numbers.kadencja && this.filtrowanieStatus.indexOf(item.status) !== -1 && item.projects.every((a) => {
          return a.tytul.indexOf(this.filtrowanieNazwa) !== -1
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
    this.fetchVotings()
    document.getElementById('scrollable-container').addEventListener('scroll', (el) => {
      if (el.target.scrollTop / (el.target.scrollHeight - el.target.clientHeight) > 0.9) {
        this.pagination++
      }
    })
  },
  methods: {
    fetchVotings () {
      this.$store.commit('loadingUp')
      this.$http.get(this.$store.state.domain + ':3000/dev/glosowania/').then(response => {
        this.$store.commit('loadingDown')
        this.votings = response.body
      }, response => {
        // error callback
      })
    },
    hideList () {
      this.listHidden = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sort-filter-menu {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 2vmin;
  background: var(--color-2-op);
}
.sort-filter-menu > * {
  margin: 1vmin;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.filtrowanie-nazwa{
}
.filtrowanie-nazwa input{
  padding: 1vmin;
  background-color: white;
  /*width: 90px;*/
  font-size: 2vmin;
  border: none;
}
.filtrowanie-status{
  flex-direction: column;
  align-items: flex-start;
}
.voting-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vmin;
  height: 100vh;
  background: var(--color-1-op);
  z-index: 89;
  transition: 1s ease-in-out;
  /*font-size: 70%;*/
  /*display: none;*/
}
select {
  border-radius: 0.5vmin;
  background: var(--color-3);
  font-size: inherit;
  padding: 0.5vmin;
}

.voting-list {
  padding: 2vmin;
  display: flex;
  flex-flow: column;
  height: calc(100vh - 25vmin);
}

#scrollable-container {
  position: relative;
  max-height: 90vh;
  overflow-y: scroll;
  z-index: 10;
}

.list-hidden {
  left: -100vmin;
}

#fold-button {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 7vmin solid transparent;
  border-bottom: 7vmin solid transparent;

  border-right:7vmin solid var(--color-0);
  /*border-left:5vmin solid var(--color-0);*/
  /*background: var(--color-0);*/
  top: calc(50vh - 3.5vmin);
  left: calc(100vmin + 1vmin);

  /*border-radius: 100%;*/
  opacity: 0.7;
  transition: opacity 0.5s;
  cursor: pointer;
  z-index: 1;
}

#fold-button:hover {
  opacity: 1;
}
</style>
