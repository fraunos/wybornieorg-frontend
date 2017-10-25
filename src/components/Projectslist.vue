<template>
<div :class="['project-menu', {'list-hidden':listHidden}]">
  <div id="fold-button" @click="listHidden=!listHidden"></div>
  <!-- <button v-for="(project, index) in projectsSortedRange" type="button" :key="index" @click="fetchProject(project)" href="#data"><span>{{project.drukNr}}</span><br>{{project.tytul}}<br>Frekwencja: {{Math.floor(project.frekwencja*100)}}%<br>{{project.status}}</button> -->
  <div class="scrollable-container">
    <div class="project-list">
      <router-link :id="project.drukNr" v-for="(project, index) in projectsSorted" :key="index" :class="['project-list-item']" :to="{ name: 'projects', params: { druk: project.drukNr, kadencja: project.kadencja } }">
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
import {
  ArrowLeftIcon,
  ArrowRightIcon
} from 'vue-feather-icons'

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
    ArrowLeftIcon,
    ArrowRightIcon
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
      this.$http.get(this.$store.state.domain + ':3000/dev/projekty/').then(response => {
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
span {
  /*font-weight: bold;*/
}

div {
  /*padding: 10px;*/
  /*flex-flow: row;*/
}
.uchwalono {
  border-right: 1.5vmin solid green;
}
.odrzucony {
  border-right: 1.5vmin solid red;
}
.sort-filter-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5vmin;
}
.project-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vmin;
  height: 100vh;
  background: var(--color-1-op);
  z-index: 89;
  transition: 1s ease-in-out;
  font-size: 70%;
  /*display: none;*/
}

.project-list {
  padding: 5vmin;
  display: flex;
  flex-flow: column;
  height: auto;
}

.scrollable-container {
  position: relative;
  height: 100vh;
  overflow-y: scroll;
  z-index: 10;
}

.list-hidden {
  left: -100vmin;
}

#fold-button {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 5vmin solid transparent;
  border-bottom: 5vmin solid transparent;

  border-right:5vmin solid var(--color-0);
  /*background: var(--color-0);*/
  top: calc(50vh);
  left: calc(100vmin + 1vmin);

  /*border-radius: 100%;*/
  opacity: 0.7;
  transition: opacity 0.5s;
  cursor: pointer;
  z-index: 1;
}

#fold-button:hover {
  opacity: 1;
}

.project-list-item {
  background: white;
  padding: 3vmin;
  margin: 1vmin;
  border-radius: 2vmin;
}
a {
  color: black;
}
a:hover{
  color: var(--color-0);
}
a.router-link-exact-active {
  /*border-width: 2em;*/
  background-color: var(--color-4);
  color: white;
}

.tytul {
  /*font-size: 1vmin;*/
}

span {
  margin: 1vmin;
}
</style>
