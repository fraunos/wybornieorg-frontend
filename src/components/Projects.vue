<template>
<div class="main">
  <div class="projects">
    <transition-group name="fade">
      <button v-for="(project, index) in projectsSorted" type="button" :key="index" @click="fetchProject(project)" href="#data"><span>{{project.drukNr}}</span><br>{{project.tytul}}<br>Frekwencja: {{Math.floor(project.attendance*100)}}%<br>{{project.status}}</button>
    </transition-group>
  </div>
  <currentproject></currentproject>

</div>
</template>

<script>
import Currentproject from '@/components/Currentproject'

export default {
  name: 'projectslist',
  components: {
    Currentproject
  },
  computed: {
    projects () {
      return this.$store.state.projects
    },
    projectsSorted () {
      return this.$store.state.projects.sort((a, b) => {
        return b.attendance - a.attendance
      })
    }
  },
  // data () {
  //   return {
  //     projects: [],
  //     currentProject: []
  //   }
  // },
  created () {
    this.fetchProjects()
  },
  methods: {
    fetchProjects () {
      return this.$store.dispatch('fetchProjects')
    },
    fetchProject (project) {
      document.getElementById('data').scrollIntoView({behavior: 'smooth'})
      return this.$store.dispatch('fetchProject', project)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  font-weight: bold;
}
div {
  padding: 10px;
  flex-flow: row;
}

.projects {
  flex-basis: 30%;
  flex-flow: column;
}

ul {
  list-style-type: none;
  padding: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: .5s;
  opacity: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
