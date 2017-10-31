<template>
<div class="projects">
  <projects-list></projects-list>
  <div v-show="druk == null" class="">
    <p>Wybierz projekt z listy!<br></p>
    <p>Aby wyświetlić listę, użyj przycisku z lewej strony!</p>
  </div>
  <current-project v-if="druk"></current-project>

</div>
</template>

<script>
import CurrentProject from '@/components/CurrentProject'
import ProjectsList from '@/components/ProjectsList'

export default {
  name: 'projects',
  props: ['druk', 'kadencja'],
  data () {
    return {
      projects: []
    }
  },
  components: {
    CurrentProject,
    ProjectsList
  },
  computed: {
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
div {}

.projects {
  /*display: flex;*/
  /*align-items: center;*/
}
</style>
