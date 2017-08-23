<template>
<div class="hello">
  <quotes></quotes>
  <div class="">
    <h3>Zbliżają się wybory, a Ty nie wiesz komu można zaufać? Wciel się w posła, zagłosuj na kluczowe projekty minionej kadencji i przekonaj się kto może Cię godnie reprezentować!
</h3>
  </div>
</div>
</template>

<script>
import Quotes from '@/components/Quotes'

export default {
  // data() {
  //   return {
  //   }
  // },
  components: {
    Quotes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  padding: 20px;
  flex-flow: row;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
