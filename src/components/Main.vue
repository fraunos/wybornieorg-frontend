<template>
<div class="main">
  <h1>MAIN</h1>
  <projects></projects>
</div>
</template>

<script>

import Projects from '@/components/Projects'

export default {
  data () {
    return {}
  },
  components: {
    Projects
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  background-color: crimson;
  padding: 10px;
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
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
