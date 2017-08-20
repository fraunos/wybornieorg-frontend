<template>
<div class="main">
  <div class="projects">
    <h2>Projekty</h2>
    <ul>
      <li v-for="project in projects" >
        <button type="button" v-on:click="fetchProject(project)"><h3>{{project.drukNr}}</h3><span>{{project.tytul}}</span></button>
      </li>
    </ul>
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
      $.get('http://localhost:3000/dev/projekty').done(data => {
        self.projects = data
      })
    },
    fetchProject: function (project) {
      var self = this
      $.get('http://localhost:3000/dev/projekty/' + project.drukNr).done(data => {
        self.currentProject = data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  background-color: lightcoral;
  padding: 10px;
  flex-flow: row;
}

.projects {
  flex-basis: 30%;
  flex-flow: column;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
