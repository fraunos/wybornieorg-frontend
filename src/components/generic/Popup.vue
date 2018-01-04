<template>
<div class="popup">
<div @click="$emit('close')" class="popup">
</div>
  <div class="popup-window">
    <div class="header">
      <slot name="header"></slot>
      <x-icon @click="$emit('close')"></x-icon>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</div>
</template>

<script>
import {
  XIcon
} from 'vue-feather-icons'

export default {
  data () {
    return {
    }
  },
  components: {
    XIcon
  },
  mounted () {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup{
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  z-index: 99;

}
.popup-window {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 20vmin);
  background-color: white;
  z-index: 99;
  padding: 5vmin;
  border-radius: 1vmin;
  box-shadow: black 0 0 10vmin 0;
}
.content {
  max-width: 80vmin;
  max-height: calc(100vh - 20vmin);
  overflow-y: auto;
}
.header {
  display: flex;
  justify-content: space-between;
}
svg {
  width: 7vh;
  height: 7vh;
  cursor: pointer;
}
</style>
