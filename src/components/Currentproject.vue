<template>
<div id="cp" class="currentProject">

  <div id="data">
    {{userVotes}}
    <h3>{{currentProject.tytul}}</h3>
    <p>{{currentProject.status}}</p>
    <p>{{currentProject.drukNr}}</p>

    <p><a :href="currentProject.tresc">treść ustawy</a></p>
    <p><a :href="currentProject.przebieg">przebieg projektu</a></p>
    <p><a :href="currentProject.votingLink">decydujące głosowanie</a></p>
    <!-- <p>{{currentProject.votingData}}</p> -->
    <!-- <p>{{currentProject.groupLinks}}</p> -->
  </div>
  <div id="buttons">
    <button type="button" name="voteFor" v-on:click="userVote('Za')"><feather-icon type="thumbs-up"></feather-icon></button>
    <button type="button" name="voteAgainst" v-on:click="userVote('Przeciw')"><feather-icon type="thumbs-down"></feather-icon></button>
  </div>
  <ul id="deputies">
    <li v-for='deputy in currentProject.deputies'>
      <deputy :singleDeputy='deputy'></deputy>
    </li>
  </ul>
</div>
</template>

<script>
import Deputy from '@/components/Deputy'

export default {
  // data () {
  //   return {
  //     userVotes: {}
  //   }
  // },
  components: {
    Deputy
  },
  computed: {
    userVotes () {
      return this.$store.state.userVotes
    },
    currentProject () {
      return this.$store.state.currentProject
    }
  },
  methods: {
    userVote (vote) {
      if (this.$store.state.currentProject.drukNr !== undefined) {
        this.$store.commit('userVote', vote)
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
  justify-content: center;
}
button{
  border-radius: 100%;
  width: 48px;
}

#deputies {
  flex-wrap: wrap;
  display: flex;
  list-style: none;
}
</style>
