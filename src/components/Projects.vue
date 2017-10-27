<template>
<div class="projects">
  <projectslist></projectslist>
  <div v-show="druk == null" class="">
    <p>Wybierz projekt z listy!<br></p>
    <p>Aby wyświetlić listę, użyj przycisku z lewej strony!</p>
  </div>
  <currentproject v-if="druk"></currentproject>

</div>
</template>

<script>
import Currentproject from '@/components/Currentproject'
import Projectslist from '@/components/Projectslist'

export default {
  name: 'projects',
  props: ['druk', 'kadencja'],
  data () {
    return {
      projects: []
    }
  },
  components: {
    Currentproject,
    Projectslist
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
