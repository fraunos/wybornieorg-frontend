<template>
<div>
  <h1>Statystyki</h1>
  <h5>Wagi głosów:<br>zgodny = 1, niezgodny = -1, nieobecność/wstrzymanie się = 0</h5>
  <p v-if='userVoted'>Brak statystyk! Zagłosuj najpierw</p>
  <div class="stats" v-else>
    <stats-deputy v-for="(value, key, index) of deputiesStatsSortedZgodne" :deputy="value"></stats-deputy>
  </div>
</div>
</template>

<script>
import StatsDeputy from '@/components/StatsDeputy'
import AppNav from '@/components/AppNav'

export default {
  data () {
    return {}
  },
  components: {
    StatsDeputy,
    AppNav
  },
  computed: {
    deputiesStats () {
      return [...this.$store.state.deputiesStats.entries()]
    },
    userVoted () {
      return JSON.stringify(this.$store.state.userVotes) === '{}'
    },
    deputiesStatsSortedZgodnoscProcent () {
      return this.deputiesStats.sort((a, b) => {
        return b[1].zgodnoscProcent - a[1].zgodnoscProcent
      })
    },
    deputiesStatsSortedZgodne () {
      return this.deputiesStats.sort((a, b) => {
        return (b[1].zgodne.size - b[1].niezgodne.size) - (a[1].zgodne.size - a[1].niezgodne.size)
      })
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

</style>
