<template>
<div class="app-nav">
    <div :class="['logo']" id="logo" @click="$emit('ostronie')" @mouseover="wybornie = true" @mouseleave="wybornie = false"><font-awesome-icon icon="info" v-show="wybornie"/></div>
    <font-awesome-icon icon="chart-bar" @click="$emit('staty')"/>
    <font-awesome-icon icon="arrow-circle-left" @click="switchVoting(-1)"/>
    <font-awesome-icon icon="arrow-circle-right" @click="switchVoting(1)"/>
    <font-awesome-icon icon="list" id="listBtn" @click="$emit('votingList')"/>
</div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      wybornie: false,
      showMenu: false
    }
  },
  mounted () {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.switchVoting(-1)
      }
      if (event.key === 'ArrowRight') {
        this.switchVoting(1)
      }
    })
  },
  components: {
  },
  methods: {
    switchVoting (direction) {
      document.dispatchEvent(new CustomEvent('voteSwitch', { detail: direction }))
    }
  }
}
</script>

<style scoped>
.app-nav{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #222;
}
.logo {
  background-image: url("/static/img/icons/logo.svg");
  background-size: cover;
  background-repeat: no-repeat;
}
.logo * {
}
.app-nav * {
  height: 10vmin;
  width: 10vmin;
  user-select: none;
}
.app-nav > * {
  color: var(--color-base);
  cursor: pointer;
}
.app-nav > *:hover {
  color: white;
}
#listBtn{
  display: none;
}
@media screen and (max-device-aspect-ratio: 1/1) {
  .app-nav {
    position: sticky;
    top: 0;
    width: 100vw;
    flex-direction: row;
  }
  #listBtn{
    display: block;
  }
}
@media screen and (min-device-aspect-ratio: 1/1) {
  .app-nav {
    height: 100vh;
  }
  #listBtn{
    display: none;
  }
}
</style>
