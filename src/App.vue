<template>
  <div id="app">
    <a href="#"><img src="./assets/logo.svg"><h1>wybornie.pl</h1></a>
    <appnav></appnav>
    <router-view></router-view>
  </div>
</template>

<script>
import Appnav from '@/components/Appnav'

export default {
  name: 'app',
  components: {
    Appnav
  }
}
</script>

<style>
div{
  background-color: lightgrey;
  padding: 10px;
  display: flex;
  flex-flow: column;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
