<template>
<div id="app">
  <div class="app">
    <div id="wipcontainer" v-show="popup">
      <div id="wip">
        <x-icon @click="popup=!popup" class="pointer"></x-icon>
        <span><alert-triangle-icon></alert-triangle-icon> Strona w budowie
           <alert-triangle-icon></alert-triangle-icon></span>
           <span>Jeśli chcesz wesprzeć projekt - skontaktuj się ze mną - adres w stopce.</span>
      </div>
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
  AlertTriangleIcon, XIcon
} from 'vue-feather-icons'

export default {
  name: 'app',
  components: {
    Appnav,
    Appfooter,
    AlertTriangleIcon,
    XIcon
  },
  data () {
    return {
      popup: true
    }
  }
}
</script>

<style>
svg{
  vertical-align: bottom;
}
img{
  border: black 2px;
}
.router{
  margin: 2em;
}
#wip svg {
  width: 48px;
  height: 48px;
}

#wip {
  position: absolute;
  font-weight: bold;
  width: 40vw;
  left: 30vw;
  height: auto;
  top: 20vh;
  background: repeating-linear-gradient( 45deg,
  orange,
  orange 20px,
  darkslategrey 20px,
  darkslategrey 40px);
}
#wipcontainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.9);
}
.pointer {
  cursor: pointer;
  background: black;
  border-radius: 100%;
}

#wip span {
  background-color: orange;
  color: darkslategrey;
  stroke: darkslategrey;
  padding: 20px;
}

body {
  background-color: #090960;
  margin: 0 5%;
}
p {
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
  color: black;
  stroke: white;
}

.app {
  background-color: white;
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
.router-link-exact-active {
  border-bottom: 0.2em solid #f00;
}
a:hover {
  color: hotpink;
  stroke: hotpink;
  /*opacity: .5;*/
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
