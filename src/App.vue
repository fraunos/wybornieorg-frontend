<template>
  <div id="app">
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
body{
  background-color: midnightblue;
  margin: 0 8%;
}
div{
  display: flex;
  flex-flow: column;
}
#app {
  font-family: sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: white;
}
button{
  border-radius: 0;
  border-style: none;
  margin: 10px;
  background-color: royalblue;
  padding: 10px;
  color: white;
}
button:hover{
  background-color: lightcoral;
}
button:active{
  right: 0;
  outline-style: none;
}
a {
  color: royalblue;
  text-decoration: none;
  outline: none;
  font-weight: bold;
}
</style>
