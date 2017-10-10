<template>
<div id="app">
    <!-- <div id="wipcontainer" v-show="popup">
      <div id="wip">
        <x-icon @click="popup=!popup" class="pointer"></x-icon>
        <span><alert-triangle-icon></alert-triangle-icon> Strona w budowie
           <alert-triangle-icon></alert-triangle-icon></span>
           <span>Jeśli chcesz wesprzeć projekt - skontaktuj się ze mną - adres w stopce.</span>
      </div>
    </div> -->

    <div class="router">
      <transition name="fade" mode="out-in">
        <router-view ></router-view>
      </transition>
    </div>
</div>
</template>

<script>
import {
  AlertTriangleIcon, XIcon
} from 'vue-feather-icons'

export default {
  name: 'app',
  components: {
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

</style>
