<template>
<div id="app">
  <appnav></appnav>
  <div class="router">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  <!-- <appfooter></appfooter> -->
</div>
</template>

<script>
import Appfooter from '@/components/Appfooter'
import Appnav from '@/components/Appnav'
import {
  AlertTriangleIcon,
  XIcon
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
h1, h2, h3{
  padding-bottom: 0.5em;
  border-bottom: 0.05em solid black;
}

body {
  font-family: sans-serif;
  font-size: 3vmin;
  text-align: justify;
  background: var(--color-2);
  margin: 0 15vw 5vmin;
  color: black;
  overflow-x: hidden;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.router {
  /*vertical-align: middle;*/
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  z-index: 10;
}

a {
  text-decoration: none;
  color: var(--color-0);
  cursor: pointer;
}

a:hover {
  color: inherit;
}

a:active {
  color: inherit;
}
:root {
  --color-0: #d4213d;
  --color-1: #D56454;
  --color-2: #f1cd8c;
  --color-3: #A1D573;
  --color-4: #4d619e;

  --color-1-op: rgba(213, 100, 84, 0.7);
}

*::-webkit-scrollbar {
  width: 1.5vmin;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,1);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--color-4);
  border-radius: 2vmin;
  outline: 10px solid white;
}
</style>
