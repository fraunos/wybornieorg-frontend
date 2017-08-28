<template>
<div class="stats">
  <p></p>
  <ul>
    <li v-for="(value, key) of deputiesStats">
      {{key}} : {{value.zgodne.size}}/{{value.zgodne.size + value.niezgodne.size}} {{100*value.zgodne.size/(value.zgodne.size + value.niezgodne.size)}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {
  },
  computed: {
    deputiesStats () {
      return this.$store.state.deputiesStats
    }
  }
}
</script>

<style scoped>
</style>
