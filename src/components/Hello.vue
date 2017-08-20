<template>
<div class="hello">
  <quotes></quotes>
  <h3>Zbliżają się wybory, a Ty nie wiesz komu można zaufać? Wciel się w posła, zagłosuj na kluczowe projekty minionej kadencji i przekonaj się kto może Cię godnie reprezentować!
</h3>
</div>
</template>

<script>
import Quotes from '@/components/Quotes'

export default {
  data () {
    return {
      msg: 'Witaj w serwisie, który uratuje Polskę!'
    }
  },
  components: {
    Quotes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  background-color: blanchedalmond;
  padding: 10px;
  flex-flow: row;
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
