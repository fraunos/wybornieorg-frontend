<template>
<div class="stats">
  <p></p>
  <ol>
    <li v-for="(value, key, index) of deputiesStatsSorted">
      {{value[0]}} : Zgodność: {{value[1].zgodne.size}}/{{value[1].zgodne.size + value[1].niezgodne.size}},  {{value[1].zgodnoscProcent}}%
    </li>
  </ol>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  computed: {
    deputiesStats () {
      return [...this.$store.state.deputiesStats.entries()]
    },
    deputiesStatsSorted () {
      return this.deputiesStats.sort((a, b) => {
        return b[1].zgodnoscProcent - a[1].zgodnoscProcent
      })
    }
  }
}
</script>

<style scoped>
</style>
