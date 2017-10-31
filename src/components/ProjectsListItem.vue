<template>
<router-link :class="['project-list-item', project.status, currentProjectVote]" :to="{ name: 'projects', params: { druk: project.drukNr, kadencja: project.kadencja } }">
  <div class="numery">
    <div class="kadencja">{{project.kadencja}}</div><div class="drukNr">{{project.drukNr}}</div>
  </div>
  <div class="tytul">{{project.tytul}}</div>
  <div class="info">
    <div class="frekwencja" :style="{backgroundColor: 'teal'}">f: {{Math.floor(project.frekwencja * 100)}}%</div>
    <div class="status">{{project.status}} {{moment(project.votingDate).calendar().toLowerCase()}}</div>
  </div>
</router-link>
</template>

<script>
import {
  CheckIcon
} from 'vue-feather-icons'

export default {
  name: 'projects-list-item',
  props: ['project'],
  data () {
    return {}
  },
  components: {
    CheckIcon
  },
  computed: {
    currentProjectVote () {
      let temp = this.$store.state.userVotes[JSON.stringify({drukNr: this.project.drukNr, kadencja: this.project.kadencja})]
      this.project.userVote = temp
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
}
.tytul{
  /*font-size: 80%;*/
}
.kadencja {
  /*border-top-left-radius: 5vmin;*/
  background-color: var(--color-3);
}
.drukNr {
  background-color: var(--color-2);
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
  border-radius: 0.5em;
  color: white;
}
.project-list-item {
  background: white;
  padding: 2vmin;
  margin: 1vmin;
  border-radius: 2vmin;
  /*border: 0.2vmin black solid;*/
}
.project-list-item > * {
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
  background-color: var(--color-4);
  color: white;
}

.za {
  background-color: orange;
}

.przeciw {
  background-color: orange;
}
</style>
