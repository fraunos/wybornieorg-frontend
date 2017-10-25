<template>
<div class="stats">
  <h1>Statystyki</h1>
  <p v-if='userVoted'>Brak statystyk! Zagłosuj najpierw</p>
  <div v-else>
    <ol>
      <li v-for="(value, key, index) of deputiesStatsSortedZgodne" :style="{ color: 'rgb(' + (100 - value[1].zgodnoscProcent) + ',' + value[1].zgodnoscProcent + ', 0)' }">
        {{value[0]}} : Zgodność: {{value[1].zgodne.size}}/{{value[1].zgodne.size + value[1].niezgodne.size}}, {{value[1].zgodnoscProcent}}%
      </li>
    </ol>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  computed: {
    deputiesStats () {
      return [...this.$store.state.deputiesStats.entries()]
    },
    userVoted () {
      console.log(this.$store.state.userVotes)
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
div{
  /*display: flex;*/
  /*flex-direction: column;*/
}
li:first-child {
  font-weight: bold;
}
li{
  padding: 0.4em;
  margin: 0.4em;
  background: white;
  border-radius: 0.6em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
ul{
  list-style-position: inside;
}
.zgodnosc{
  width: 3em;
  text-align: right;
}
span{
  /*float: right;*/
  margin-left: 0.5em;
}
</style>
