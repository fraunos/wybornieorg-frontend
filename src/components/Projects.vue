<template>
<div class="projects">
  <projectslist></projectslist>
  <p v-show="projekt == null" class="">Wybierz projekt z listy!</p>
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
      projects: []
    }
  },
  components: {
    Currentproject, Projectslist
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
div {
}
.projects {
  display: flex;
  /*align-items: center;*/
}
</style>
