<template>
<div id="app">
  <appnav></appnav>
  <div v-show="this.loading" id="loading-thing"></div>
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
  },
  computed: {
    loading () {
      return this.$store.state.loading
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
#loading-thing{
  position: fixed;
  top: 10vh;
  left: calc(50vw - 3.5vmin);
  z-index: 99;
  height: 5vmin;
  width: 5vmin;
  border: 2vmin solid crimson;
  border-left: 2vmin solid red;
  border-bottom: 2vmin solid red;
  border-radius: 100%;
  animation: 2s rotate360 infinite ease-in-out;
}
@keyframes rotate360 {
  to { transform: rotate(360deg); }
}
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
