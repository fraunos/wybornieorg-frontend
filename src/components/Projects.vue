<template>
<div class="main">
  <div class="projects">
      <button v-for="project in projects" type="button" v-on:click="fetchProject(project)" href="#data"><span>{{project.drukNr}}</span><br>{{project.tytul}}</button>
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
</style>
