<template>
  <div id="app">
    <div class="app">
      <appnav></appnav>
      <router-view></router-view>
    </div>
    <Appfooter></Appfooter>
  </div>
</template>

<script>
import Appnav from '@/components/Appnav'
import Appfooter from '@/components/Appfooter'

export default {
  name: 'app',
  components: {
    Appnav, Appfooter
  }
}
</script>

<style>
body{
  background-color: #090960;
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
.app{
  background-color: midnightblue;
  margin: 1.5em 0;
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
a:active {
  outline-style: solid;
}

a:hover {
  color: hotpink;
}
</style>
