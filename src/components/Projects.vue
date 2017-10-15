<template>
<div class="projects">
  <projectslist></projectslist>
  <div v-show="projekt == null" class="">
    Wybierz projekt z listy!
  </div>
  <currentproject v-if="projekt"></currentproject>

</div>
</template>

<script>
import Currentproject from '@/components/Currentproject'
import Projectslist from '@/components/Projectslist'

export default {
  name: 'projects',
  props: ['projekt'],
  data () {
    return {
      projects: [],
      pagination: 0,
      itemsPerPage: 10
    }
  },
  components: {
    Currentproject, Projectslist
  },
  computed: {
    projectsSorted () {
      return this.projects.sort((a, b) => {
        return b.attendance - a.attendance
      })
    },
    projectsSortedRange () {
      return this.projects.sort((a, b) => {
        return b.attendance - a.attendance
      }).slice(this.itemsPerPage * this.pagination, this.itemsPerPage * this.pagination + this.itemsPerPage)
    },
    userVotes () {
      return this.$store.state.userVotes
    }
  },

  created () {
  },
  methods: {

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
