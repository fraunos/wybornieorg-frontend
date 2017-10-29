<template>
<div :class="['project-menu', {'list-hidden':listHidden}]">
  <div id="fold-button" @click="listHidden=!listHidden"></div>


  <div class="scrollable-container">
    <div class="sort-filter-menu">
      <div class="">
        <select v-model="kadencje">
         <option v-for="item in [3, 4, 5, 6, 7, 8].reverse()" :value="item">Kadencja {{item}}</option>
        </select>
      </div>
      <div class="">
        <select v-model="sortowanie">
          <option value="votingDate">Najnowsze</option>
          <option value="drukNr">Wg nr druku</option>
          <option value="frekwencja">Z największą frekwencją</option>
        </select>
      </div>
      <div class="">
        <input type="checkbox" name="uchwalono" value="uchwalono" v-model="filtrowanieStatus">
        <label for="uchwalono">Uchwalone</label>
        <input type="checkbox" name="" value="odrzucony" v-model="filtrowanieStatus">
        <label for="odrzucony">Odrzucone</label>
      </div>

    </div>
    <div class="project-list" @click="hideList()">
      {{projectsProcessed.length}}

      <router-link :id="project.drukNr" v-for="(project, index) in projectsProcessed" :key="index" :class="[project.status, 'project-list-item']" :to="{ name: 'projects', params: { druk: project.drukNr, kadencja: project.kadencja } }">
        <span class="kadencja">{{project.kadencja}}</span><span class="drukNr">{{project.drukNr}}</span><span class="tytul">{{project.tytul}}</span> <br><span class="frekwencja">f: {{Math.floor(project.frekwencja * 100)}}%</span><span class="status">{{project.status}}</span><span class="data">{{moment(project.votingDate).calendar()}}</span>
      </router-link>
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
      listHidden: true,
      kadencje: 8,
      sortowanie: 'votingDate',
      filtrowanieStatus: ['odrzucony', 'uchwalono']
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
    projectsProcessed () {
      return this.projects.filter(item => {
        // return this.kadencje.indexOf(item.kadencja) !== -1
        return this.kadencje === item.kadencja && this.filtrowanieStatus.indexOf(item.status) !== -1
      }).sort((a, b) => {
        if (this.sortowanie === 'votingDate') {
          return new Date(b[this.sortowanie]) - new Date(a[this.sortowanie])
        } else {
          return b[this.sortowanie] - a[this.sortowanie]
        }
      })
    },
    userVotes () {
      return this.$store.state.userVotes
    }
  },
  mounted () {
    this.fetchProjects()
  },
  methods: {
    fetchProjects () {
      this.$store.commit('loadingUp')
      this.$http.get(this.$store.state.domain + ':3000/dev/projekty/').then(response => {
        this.$store.commit('loadingDown')
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
select {
  border-radius: 0.5em;
  background: var(--color-3);
  font-size: 100%;
  padding: 0.5em;
}
option{
  padding-bottom: 2em;
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
  /*border-left:5vmin solid var(--color-0);*/
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
