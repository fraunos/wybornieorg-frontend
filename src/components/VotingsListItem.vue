<template>
<router-link :class="['voting-list-item', voting.status, currentVotingVote]" :to="{ name: 'voting', params: { kadencja: voting.numbers.kadencja, posiedzenie: voting.numbers.posiedzenie, glosowanie: voting.numbers.glosowanie } }">
  <div v-if="voting.projects.length > 1" class="">
    Rozpatrywano wspólnie
  </div>
  <div class="projekty" v-for="project in voting.projects">
    <div class="numery" >
      <div class="kadencja">{{project.kadencja}}</div><div class="drukNr">{{project.drukNr}}</div>
    </div>
    <div v-if="project.prawoUE" class="ue">
      EU
    </div>
    <div class="tytul">{{project.tytul}}</div>
  </div>
  <div class="info">
    <div class="frekwencja" :style="{backgroundColor: 'teal'}">f: {{Math.floor(voting.frekwencja * 100)}}%</div>
    <div class="status">{{voting.status}} {{moment(voting.votingDate).calendar().toLowerCase()}}</div>
  </div>
</router-link>
</template>

<script>
import {
  CheckIcon
} from 'vue-feather-icons'

export default {
  name: 'votings-list-item',
  props: ['voting', 'id'],
  data () {
    return {}
  },
  components: {
    CheckIcon
  },
  computed: {
    currentVotingVote () {
      let temp = this.$store.state.userVotes[JSON.stringify(this.voting.numbers)]
      // this.voting.userVote = temp
      if (temp !== undefined) {
        return temp.toLowerCase()
      } else {
        return ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.numery * {
  display:inline-block;
  padding: 0em 0.5em;
}
.numery {
  font-weight: bold;
  float: left;
  color: black;
  border-radius: 1vmin;
  overflow: hidden;
  margin-right: 0.5em;
}
.ue{
  font-weight: bold;
  float: left;
  color: yellow;
  border-radius: 1vmin;
  overflow: hidden;
  padding: 0em 0.5em;
  margin-right: 0.5em;
  background-color: blue;
}
.tytul{
  /*font-size: 80%;*/
}
.kadencja {
  /*border-top-left-radius: 5vmin;*/
  background-color: yellow;
}
.drukNr {
  background-color: pink;
}
.uchwalono {
  border-right: 1.75vmin solid forestgreen;
}
.uchwalono .status{
  background-color: forestgreen;
}

.odrzucony {
  border-right: 1.75vmin solid red;
}
.odrzucony .status{
  background-color: crimson;
}
.status, .frekwencja{
  padding: 0 0.5em;
  border-radius: 1vmin;
  color: white;
}
.voting-list-item {
  background: white;
  padding: 2vmin;
  margin: 1vmin;
  border-radius: 1vmin;
  /*border: 0.2vmin black solid;*/
}
.voting-list-item > * {
  margin-right: 1em;
}
.info{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1vmin;
}
.info > *{
  /*float: left;*/
}
.status{
}

a {
  color: black;
}

a:hover {
  /*color: var(--color-0);*/
  /*background-color: orange;*/
}

a.router-link-exact-active {
  background-color: brown;
  color: white;
}

.za {
  background-color: orange;
}

.przeciw {
  background-color: orange;
}
</style>
