<template>
<div id="app">
  <div class="app">
    <div id="info">
      <h1>Strona w budowie</h1>
    </div>

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
    Appnav,
    Appfooter
  }
}
</script>

<style>
#info {
  background: repeating-linear-gradient( 45deg,
  orange,
  orange 20px,
  darkslategrey 20px,
  darkslategrey 40px);
}
#info h1{
  background-color: orange;
  color: darkslategrey;
  padding: 20px;
}

body {
  background-color: #090960;
  margin: 0 8%;
}

div {
  display: flex;
  flex-flow: column;
}

#app {
  font-family: sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: white;
  stroke: white;
}

.app {
  background-color: midnightblue;
  margin: 1.5em 0;
}

button {
  border-radius: 0;
  border-style: none;
  margin: 10px;
  background-color: royalblue;
  padding: 10px;
  color: white;
}

button:hover {
  background-color: lightcoral;
}

button:active {
  right: 0;
  outline-style: none;
}

svg,
line,
polyline,
path {
  stroke: inherit;
}

a {
  color: royalblue;
  stroke: royalblue;
  text-decoration: none;
  outline: none;
  font-weight: bold;
}

a:active {
  outline-style: solid;
}

a:hover {
  color: hotpink;
  stroke: hotpink;
}
</style>
