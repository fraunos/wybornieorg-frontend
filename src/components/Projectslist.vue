<template>
<div class="projlist">
  <!-- <transition-group name="fade"> -->
    <!-- <button v-for="(project, index) in projectsSortedRange" type="button" :key="index" @click="fetchProject(project)" href="#data"><span>{{project.drukNr}}</span><br>{{project.tytul}}<br>Frekwencja: {{Math.floor(project.frekwencja*100)}}%<br>{{project.status}}</button> -->
    <div v-for="(project, index) in projectsSortedRange" :key="index">
      <router-link :to="{ name: 'projects', params: { projekt: project.drukNr } }"  :class="{}">{{project.drukNr}} Frekwencja: {{Math.floor(project.frekwencja * 100)}}%</router-link>
    </div>
  <!-- </transition-group> -->
  <div class="filtermenu">
    <span>{{pagination * itemsPerPage + 1}} - {{(pagination + 1) * itemsPerPage}} / {{projects.length}}</span>
    <button type="button" name="button" v-show="pagination>0" @click="pagination--"><arrow-left-icon></arrow-left-icon></button>
    <button type="button" name="button" v-show="((pagination + 1)*itemsPerPage)<this.projects.length" @click="pagination++"><arrow-right-icon></arrow-right-icon></button>
  </div>
</div>

</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon } from 'vue-feather-icons'

const $ = require('jquery')

export default {
  name: 'projectslist',
  data () {
    return {
      projects: [],
      pagination: 0,
      itemsPerPage: 10
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(from.params.projekt)
  //   this.fetchProject(to.params.projekt)
  //   next()
  // },
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
      $.get('http://192.168.0.47:3000/dev/projekty')
        .done(data => {
          this.projects = data
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
  display: flex;
  flex-flow: row;
}
.projlist{
  flex-basis: 30%;

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
