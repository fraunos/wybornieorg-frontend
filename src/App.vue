<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
import MainApp from '@/components/MainApp'

export default {
  name: 'app',
  components: {
    MainApp
  },
  data () {
    return {
      showHello: true,
      showStats: false,
      showAbout: false,
      showList: this.isMobile
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    isMobile () {
      return this.$store.getters.isMobile
    }
  }
}
</script>

<style>
@import url(/static/Lato2OFLWeb/LatoLatin/latolatinfonts.css);

body {
  margin: 0;
  font-family: 'Lato', 'LatoLatinWeb', sans-serif;
  font-size: 2vmin;
  background: #444;
}
div {
  box-sizing: border-box;
}
#app {
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
  font-weight: bold;
  outline: none;
  color: var(--color-base);
  transition: .2s;
}
a:hover {
  color: white;
  filter: drop-shadow(0 0 0.2em var(--color-base)) drop-shadow(0 0 0.1em var(--color-base));
}
a:active{
  color: inherit;
}
.gradient {
  background-image:
    repeating-linear-gradient(
      45deg,
      yellow,
      yellow 10px,
      red 10px,
      red 20px /* determines size */
    );
}
:root {
  --color-base: #D4213D;
  --color-green1: #21D444;
  --color-green2: #00871A;
  --color-red1: #FF415F;
  --color-red2: #870B1E;
  --color-purple: #D018E1;
  --color-blue: #0E6387;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.blink-enter-active, .blink-leave-active {
  transition: opacity 2s;
}
.blink-enter *, .blink-leave-to {
  opacity: 0;
}
@keyframes rotate360 {
  to { transform: rotate(360deg); }
}

@media screen and (max-device-aspect-ratio: 1/1) {
  body{
    font-size: 3.5vmin;
  }
  .list-hidden {
    visibility: hidden;
  }
}


</style>
