<template>
<router-link :class="['voting-list-item', voting.status, {za: currentVotingVote>0, przeciw: currentVotingVote<0}]" :to="{ name: 'voting', params: { kadencja: voting.numbers.kadencja, posiedzenie: voting.numbers.posiedzenie, glosowanie: voting.numbers.glosowanie } }">
  <div v-if="voting.nazwa" class="nazwa-zwyczajowa">
    {{voting.nazwa.nazwaZwyczajowa}}
  </div>

  <div class="numery">
    <div class="kadencja">k{{voting.numbers.kadencja}}</div><div class="posiedzenie">p{{voting.numbers.posiedzenie}}</div><div class="glosowanie">g{{voting.numbers.glosowanie}}</div>
  </div><br>
  <div v-if="voting.projects.length > 1" class="">
    Rozpatrywano wspólnie
  </div>
  <div class="projekty" v-for="project in voting.projects">
    <div class="numery" >
      <div class="drukNr">#{{project.drukNr}}</div>
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
export default {
  name: 'votings-list-item',
  props: ['voting', 'id'],
  data () {
    return {}
  },
  components: {
  },
  computed: {
    currentVotingVote () {
      return this.$store.state.userVotes[`${this.voting.numbers.kadencja}/${this.voting.numbers.posiedzenie}/${this.voting.numbers.glosowanie}`]
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
  font-variant: small-caps;
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
  font-weight: 400;
  /*font-size: 80%;*/
}
.kadencja {
  /*border-top-left-radius: 5vmin;*/
  background-color: yellow;
}
.posiedzenie {
  background-color: orange;
}
.glosowanie {
  background-color: red;
}
.drukNr {
  background-color: lightskyblue;
}
.uchwalono {
  border-right: 1.75vmin solid forestgreen;
}
.uchwalono .status{
  background-color: forestgreen;
}
.nazwa-zwyczajowa {
  font-variant: small-caps;
}

.odrzucony {
  border-right: 1.75vmin solid red;
}
.odrzucony .status{
  background-color: crimson;
}
.status, .frekwencja{
  font-variant: small-caps;
  padding: 0 0.5em;
  border-radius: 1vmin;
  color: white;
}
.voting-list-item {
  background: #eee;
  padding: 2vmin;
  margin-bottom: 1vmin;
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
  /*color: var(--color-base);*/
  /*background-color: orange;*/
}
.za {
  background-color: lightgreen;
}

.przeciw {
  background-color: lightpink;
}
a.router-link-exact-active {
  box-shadow: 0 0 0 1vmin var(--color-base) inset;
  /* transform: matrix3d(1.1, 1.1, 1.1, 1.1); */
}
</style>
