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
.center {
  display: flex;
  justify-content: center;
  align-items: center;
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
  border: none;
  outline: none;
}
a:active{
  color: inherit;
}
*:focus{
  outline: none;
}
.glow {
  transition: .2s;
}
.glow:hover * {
  stroke: white;
  filter: drop-shadow(0 0 0.2em var(--color-base)) drop-shadow(0 0 0.1em var(--color-base));
}
.glow:active{
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

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  font-weight: bold;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

svg {
  min-width: 2em;
  stroke-width: 2vmin;
  stroke: var(--color-base);
  fill: transparent;
  color: transparent;
}
svg:hover {
  stroke: white;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px hsla(0, 0%, 0%, .2);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

@media screen and (max-device-aspect-ratio: 1/1) {
  body{
    font-size: 3.5vmin;
  }
  .list-hidden {
    visibility: hidden;
  }
  svg{
    stroke-width: 3.5vmin;
  }
}

</style>
