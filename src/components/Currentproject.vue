<template>
<div id="cp" class="currentProject">
<div id="buttons">
  <button type="button" name="voteFor" v-on:click="userVote('Za')">ZA</button>
  <button type="button" name="voteAgainst" v-on:click="userVote('Przeciw')">PRZECIW</button>
</div>
  <div id="data">
    {{userVotes}}
    <p>{{currentProject.tytul}}</p>
    <p>{{currentProject.status}}</p>
    <p>{{currentProject.drukNr}}</p>

    <p><a :href="currentProject.tresc">treść ustawy</a></p>
    <p><a :href="currentProject.przebieg">przebieg projektu</a></p>
    <p><a :href="currentProject.votingLink">decydujące głosowanie</a></p>
    <p>{{currentProject.votingData}}</p>
    <!-- <p>{{currentProject.groupLinks}}</p> -->
  </div>

  <ul id="deputies">
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
#cp {
  flex-flow: column;
  /*flex-basis: 70%;*/
}
#buttons{
  flex-direction: row;
}
button{
  /*width: 30px;*/
}

#deputies {
  flex-wrap: wrap;
  display: flex;
  list-style: none;
}
</style>
