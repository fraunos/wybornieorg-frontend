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
@import url('https://fonts.googleapis.com/css?family=Lato');

body {
  font-family: 'Lato', sans-serif;
  font-size: 3.5vmin;
  text-align: justify;
  background: var(--color-2);
  margin: 0 12.5vw 5vmin;
  color: black;
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
}

a:hover {
  color: inherit;
}

a:active {
  color: inherit;
}

:root {
  --color-0: #d4213d;
  /* Main Primary color-0 */
  --color-1: #D56454;
  --color-2: #F1CD67;
  --color-3: #A1D573;
  --color-4: #5E6782;

  --color-1-op: #D56454dd;
}
</style>
