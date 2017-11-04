<template>
<div class="votings">
  <votings-list></votings-list>
  <div v-show="glosowanie == null" class="">
    <p>Wybierz projekt z listy!<br></p>
    <p>Aby wyświetlić listę, użyj przycisku z lewej strony!</p>
  </div>
  <current-voting v-if="glosowanie"></current-voting>

</div>
</template>

<script>
import CurrentVoting from '@/components/CurrentVoting'
import VotingsList from '@/components/VotingsList'

export default {
  name: 'votings',
  props: ['kadencja', 'posiedzenie', 'glosowanie'],
  data () {
    return {
      votings: []
    }
  },
  components: {
    CurrentVoting,
    VotingsList
  },
  computed: {
    userVotes () {
      return this.$store.state.userVotes
    }
  },

  created () {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
