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
/*@import url('https://fonts.googleapis.com/css?family=Averia+Serif+Libre');*/
@import url('https://fonts.googleapis.com/css?family=Lato');

body{
  font-family: 'Lato', sans-serif;
  font-size: 3.5vmin;
  text-align: justify;
  background: cornsilk;
  margin: 0 10vw;
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
.fade-leave-to
{
  opacity: 0;
  z-index: 10;
}
a{
  text-decoration: none;
}

</style>
