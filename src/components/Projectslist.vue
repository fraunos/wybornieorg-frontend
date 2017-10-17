<template>
<div :class="['project-menu', {'list-hidden':listHidden}]">
  <div id="fold-button"  @click="listHidden=!listHidden"></div>
    <!-- <button v-for="(project, index) in projectsSortedRange" type="button" :key="index" @click="fetchProject(project)" href="#data"><span>{{project.drukNr}}</span><br>{{project.tytul}}<br>Frekwencja: {{Math.floor(project.frekwencja*100)}}%<br>{{project.status}}</button> -->
<div class="scrollable-container">
  <div class="project-list">
    <router-link :id="project.drukNr" v-for="(project, index) in projectsSorted" :key="index" :class="['project-list-item']" :to="{ name: 'projects', params: { projekt: project.drukNr } }"  >
      <span class="drukNr">{{project.drukNr}}</span><span class="tytul">{{project.tytul}}</span> <br><span class="frekwencja">f: {{Math.floor(project.frekwencja * 100)}}%</span><span class="status">{{project.status}}</span>
    </router-link>
  </div>
<div class="project-list-filters">
  <span>{{pagination * itemsPerPage + 1}} - {{(pagination + 1) * itemsPerPage}} / {{projects.length}}</span>
  <button type="button" name="button" v-show="pagination>0" @click="pagination--"><arrow-left-icon></arrow-left-icon></button>
  <button type="button" name="button" v-show="((pagination + 1)*itemsPerPage)<this.projects.length" @click="pagination++"><arrow-right-icon></arrow-right-icon></button>
</div>
</div>
</div>

</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon } from 'vue-feather-icons'

export default {
  name: 'projectslist',
  data () {
    return {
      projects: [],
      pagination: 0,
      itemsPerPage: 10,
      listHidden: true
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'hideList'
  },
  components: {
    ArrowLeftIcon, ArrowRightIcon
  },
  computed: {
    projectsSorted () {
      return this.projects.sort((a, b) => {
        return b.frekwencja - a.frekwencja
      })
    },
    projectsSortedRange () {
      return this.projects.sort((a, b) => {
        return b.frekwencja - a.frekwencja
      }).slice(this.itemsPerPage * this.pagination, this.itemsPerPage * this.pagination + this.itemsPerPage)
    },
    userVotes () {
      return this.$store.state.userVotes
    }
  },
  created () {
    this.fetchProjects()
  },
  methods: {
    fetchProjects () {
      this.$http.get('http://wybornie.org:3000/dev/projekty/').then(response => {
        this.projects = response.body
      }, response => {
        // error callback
      })
    },
    hideList () {
      this.listHidden = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  /*font-weight: bold;*/
}
div {
  /*padding: 10px;*/
  flex-flow: row;
}

.project-menu{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vmin;
  height: 100vh;
  background: cornflowerblue;

  z-index: 89;
  transition: 1s ease-in-out;

  /*display: none;*/
}
.project-list{
  padding: 5vmin;
  display: flex;
  flex-flow: column;
  height: auto;

}
.scrollable-container{
  height: 100vh;
  overflow-y: scroll;

}
.list-hidden{
  left: -100vmin;
}
#fold-button{
  position: absolute;
  width: 15vmin;
  height: 15vmin;
  background: red;
  top: calc(50vh - 7.5vmin);
  left: calc(100vmin - 7.5vmin);
  border-radius: 100%;

  cursor: pointer;
}
.project-list-item{
  background: white;
  padding: 1em;
  margin: 1vmin;
  border: black solid;
  border-width: 0.1em;
  border-radius: 2em;
  font-size: 70%;

}
a.router-link-exact-active{
  /*border-width: 2em;*/
  background-color: lightcoral;
}
.tytul{
  font-size: 90%;
}
span{
  margin: 0.2em;
}
</style>
