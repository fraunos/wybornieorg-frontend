<template>
<div>
  <h5>Wagi głosów:<br>zgodny = 1, niezgodny = -1, nieobecność/wstrzymanie się = 0</h5>
  <p v-if='!Object.keys(this.userVotes).length'>Brak statystyk! Zagłosuj najpierw</p>
  <div v-else>
    <div class="export">
      <router-link :to="{ name: 'loading', params: { dane: this.userVotesEncoded } }">Zapisz swoje głosowania zachowując ten adres</router-link>
    </div>
    <div class="stats">
    <stats-deputy v-if="doneLoading" v-for="(value, key, index) of deputiesStats" :deputy="value"></stats-deputy>
  </div>
  </div>
</div>
</template>

<script>
import StatsDeputy from '@/components/StatsDeputy'
import AppNav from '@/components/AppNav'

export default {
  data () {
    return {
      deputiesStats: new Map(),
      doneLoading: false
    }
  },
  components: {
    StatsDeputy,
    AppNav
  },
  created () {
    this.checkCache()
  },
  computed: {
    userVotes () {
      return this.$store.state.userVotes
    },
    userVotesEncoded () {
      return window.btoa(JSON.stringify(this.userVotes))
    },
    deputiesStatsArray () {
      return [...this.deputiesStats.entries()]
    }
    // deputiesStatsSortedZgodnoscProcent () {
    //   return this.deputiesStats.sort((a, b) => {
    //     return b[1].zgodnoscProcent - a[1].zgodnoscProcent
    //   })
    // },
    // deputiesStatsSortedZgodne () {
    //   return this.deputiesStats.sort((a, b) => {
    //     return (b[1].zgodne.size - b[1].niezgodne.size) - (a[1].zgodne.size - a[1].niezgodne.size)
    //   })
    // }
  },
  methods: {
    checkCache () {
      this.$store.commit('loadingUp')
      console.log('checkCache')
      let promise = []

      for (let numbers in this.userVotes) {
        console.log(`${numbers} ${this.userVotes[numbers]}`)
        let voting = this.$store.getters.currentVoting(numbers)
        if (voting === undefined) {
          promise.push(this.$http.get(this.$store.state.domain + ':3000/dev/glosowania/' + numbers))
        }
      }

      return Promise.all(promise).then(resolve => {
        for (var response of resolve) {
          this.$store.commit('cacheVoting', { numbers: `${response.body.numbers.kadencja}/${response.body.numbers.posiedzenie}/${response.body.numbers.glosowanie}`, data: response.body })
        }
        // this.currentVoting = this.adjustVotes(response.body)
        this.getDeputiesStats()
      })
    },
    getDeputiesStats () {
      console.log('deputiesStats')
      for (let numbers in this.userVotes) {
        let voting = this.$store.getters.currentVoting(numbers)

        for (var deputy of voting.deputies) {
          let temp = this.deputiesStats.get(deputy.name)
          if (temp === undefined) {
            temp = {
              zgodne: new Set(),
              niezgodne: new Set()
            }
          }
          let deputyVote = deputy.vote === 'Za' ? 1 : deputy.vote === 'Przeciw' ? -1 : 0
          if (this.userVotes[numbers] === deputyVote) {
            temp.niezgodne.delete(numbers)
            temp.zgodne.add(numbers)
          } else {
            temp.zgodne.delete(numbers)
            temp.niezgodne.add(numbers)
          }
          temp.zgodnoscProcent = Math.floor(100 * temp.zgodne.size / (temp.zgodne.size + temp.niezgodne.size))
          this.deputiesStats.set(deputy.name, temp)
        }
      }
      this.deputiesStats = [...this.deputiesStats.entries()].sort((a, b) => {
        return (b[1].zgodne.size - b[1].niezgodne.size) - (a[1].zgodne.size - a[1].niezgodne.size)
      })
      this.doneLoading = true
      this.$store.commit('loadingDown')
    }
  }
}
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.export {
  background-color: pink;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

</style>
