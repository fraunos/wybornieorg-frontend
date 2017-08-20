<template>
<div id="cp" class="currentProject">
  <button type="button" name="voteFor" v-on:click="userVote('Za')">ZA</button>
  <button type="button" name="voteAgainst" v-on:click="userVote('Przeciw')">PRZECIW</button>
  {{userVotes}}
  <p>{{currentProject.tytul}}</p>
  <p>{{currentProject.status}}</p>
  <p>{{currentProject.drukNr}}</p>
  <!-- {{currentProject.tresc}}
  {{currentProject.przebieg}}
  {{currentProject.votingLink}}
  {{currentProject.votingData}}
  {{currentProject.groupLinks}} -->

  <ul class="deputies">
    <li v-for='deputy in currentProject.deputies'>
      <deputy :singleDeputy='deputy' :userVoteCurrent='userVoteCurrent'></deputy>
    </li>
  </ul>
</div>
</template>

<script>
import Deputy from '@/components/Deputy'

export default {
  props: ['currentProject'],
  data () {
    return {
      userVotes: {}
    }
  },
  components: {
    Deputy
  },
  computed: {
    userVoteCurrent: function () {
      console.log('działaj kurwo')
      return this.userVotes[this.currentProject.drukNr]
    }
  },
  methods: {
    userVote: function (vote) {
      if (this.currentProject.drukNr !== undefined) {
        // this.userVotes[this.currentProject.drukNr] = vote
        this.$set(this.userVotes, this.currentProject.drukNr, vote)
        this.$forceUpdate()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  flex-flow: column;
  flex-basis: 70%;
}
.deputies {
  flex-wrap: wrap;
  display: flex;
  list-style: none;
}
</style>
