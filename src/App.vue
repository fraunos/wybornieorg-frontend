<template>
<div id="app">
  <app-nav></app-nav>
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
import AppFooter from '@/components/AppFooter'
import AppNav from '@/components/AppNav'
import {
  AlertTriangleIcon,
  XIcon
} from 'vue-feather-icons'

export default {
  name: 'app',
  components: {
    AppNav,
    AppFooter,
    AlertTriangleIcon,
    XIcon
  },
  watch: {
    '$route': function () {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
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
h1, h2, h3 {
  padding-bottom: 0.5em;
  border-bottom: 0.05em solid black;
  text-align: left;
}

body {
  font-family: sans-serif;
  font-size: 2vmin;
  /*text-align: justify;*/
  text-shadow: 0 0 0.1em rgba(0, 0, 0, 0.2);
  background: var(--color-2);
  margin: 5vmin;
  color: black;
  overflow-x: hidden;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.router {
  background-color: white;
  padding: 5vw;
  width: 60%;

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
svg {
  margin-right: 0.5em;
  height: 1em;
  width: 1em;
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
  --color-2-op: rgba(150, 100, 84, 0.7);
}
#loading-thing{
  position: fixed;
  top: 10vmin;
  left: calc(50vw - 5.5vmin);
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

@media screen and (max-device-aspect-ratio: 1/1) {
  .menu {
    flex-direction: column;
  }
  body{
    font-size: 3vmin;
  }
  .router {
    width: 80%;
  }
  input{
    /*transform: scale(2);*/
  }
}
</style>
