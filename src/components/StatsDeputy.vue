<template>
  <div class="deputy" :style="{ borderColor: 'rgb(' + (255 - deputy[1].zgodnoscProcent * 2.5) + ',' + deputy[1].zgodnoscProcent*1.2 + ', 0)' }">

  <div class="name">
    <a target="_blank" :href="'https://encrypted.google.com/search?q=' + deputy[0].replace(' ', '+')">{{deputy[0]}}</a>
  </div>
  <div class="bar">
    <div class="zgodne" :title="deputy[1].zgodne" :style="{ width: deputy[1].zgodnoscProcent + '%'}"></div>
    <div class="niezgodne" :title="JSON.stringify(deputy[1].niezgodne)" :style="{ width: (100 - deputy[1].zgodnoscProcent) + '%'}"></div>
  </div>
  <span>{{deputy[1].zgodne.size}}/{{deputy[1].zgodne.size + deputy[1].niezgodne.size}}, {{deputy[1].zgodnoscProcent}}%</span>
</div>
</template>

<script>
export default {
  name: 'stats-deputy',
  props: ['deputy'],
  data () {
    return {}
  },
  components: {},
  computed: {
  }
}
</script>

<style scoped>
  .deputy{
    background: #191940;
    border-radius: 0.5em;
    /*border-top: solid 0.5em;*/
    margin: 0.2em;
    padding: 0.5em;
    width: 20vmin;
    height: auto;
    color: white;
    word-wrap: break-word;
  }
  .name{
    font-weight: bold;
  }
  .bar{
    height: 0.5em;
    width: 100%;
    margin: 0.2em 0;
    padding: 0;
  }
  .zgodne{
    background-color: green;
    display: block;
    height: 100%;
    float: right;
  }
  .niezgodne{
    display: block;
    background-color: red;
    height: 100%;
    float: right;
  }
</style>
