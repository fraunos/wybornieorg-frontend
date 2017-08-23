c<template>
<div class="main">
  <div class="projects">
    <h2>Projekty</h2>
      <button v-for="project in projects" type="button" v-on:click="fetchProject(project)"><span>{{project.drukNr}}</span><br>{{project.tytul}}</button>
  </div>
  <currentproject :currentProject='currentProject'></currentproject>

</div>
</template>

<script>
import Currentproject from '@/components/Currentproject'

const $ = require('jquery')
export default {
  name: 'projectslist',
  components: {
    Currentproject
  },
  data () {
    return {
      projects: [],
      currentProject: []
    }
  },
  created () {
    this.fetchProjects()
  },
  methods: {
    fetchProjects: function () {
      var self = this
      $.get('http://89.70.23.117:3000/dev/projekty').done(data => {
        self.projects = data
      })
    },
    fetchProject: function (project) {
      var self = this
      $.get('http://89.70.23.117:3000/dev/projekty/' + project.drukNr).done(data => {
        self.currentProject = data
      })
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
