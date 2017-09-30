<template>
<div id="app">
  <div class="app">
    <div id="info">
      <h1><alert-triangle-icon></alert-triangle-icon> Strona w budowie <alert-triangle-icon></alert-triangle-icon></h1>
    </div>

    <appnav></appnav>
    <div class="router">
      <transition name="fade" mode="out-in">
        <router-view ></router-view>
      </transition>
    </div>
  </div>
  <Appfooter></Appfooter>
</div>
</template>

<script>
import Appnav from '@/components/Appnav'
import Appfooter from '@/components/Appfooter'
import {
  AlertTriangleIcon
} from 'vue-feather-icons'

export default {
  name: 'app',
  components: {
    Appnav,
    Appfooter,
    AlertTriangleIcon
  }
}
</script>

<style>
.router{
  margin: 2em;
}
#info svg {
  width: 48px;
  height: 48px;
}

#info {
  background: repeating-linear-gradient( 45deg,
  orange,
  orange 20px,
  darkslategrey 20px,
  darkslategrey 40px);
}

#info h1 {
  background-color: orange;
  color: darkslategrey;
  stroke: darkslategrey;
  padding: 20px;
}

body {
  background-color: #090960;
  margin: 0 5%;
}
p{
  text-align: justify;

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
}

button {
  border-radius: 1em;
  border-style: none;
  margin: 10px;
  background-color: royalblue;
  padding: 10px;
  color: white;
  opacity: 1;
  transition: .5s;
}

button:hover {
  background-color: lightcoral;
  opacity: .5;
  transition: .5s;
}

button:active {
  background-color: crimson;
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
  opacity: 1;
  transition: .5s;
}

a:active {
  outline-style: solid;
}

a:hover {
  color: hotpink;
  stroke: hotpink;
  opacity: .5;
  transition: .5s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  z-index: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  z-index: 10;
}
</style>
