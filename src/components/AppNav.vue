<template>
<div class="app-nav">
  <div>
    <!--  -->
    <router-link class="logo" :to="{ name: 'home' }"><img src="/static/img/icons/logo.svg" alt="wybornie"></router-link>
  </div>

  <!-- <div  id="logo" @click="$emit('ostronie')" @mouseover="wybornie = true" @mouseleave="wybornie = false"></div> -->
  <div class="glow">
    <font-awesome-icon v-tooltip="'Statystyki'" icon="chart-bar" @click="$emit('staty')"/>
  </div>
  <div class="glow">
    <font-awesome-icon v-tooltip="'Poprzednie głosowanie'" icon="arrow-circle-left" @click="switchVoting(-1)"/>
  </div>
  <div class="glow">
    <font-awesome-icon v-tooltip="'Następne głosowanie'" icon="arrow-circle-right" @click="switchVoting(1)"/>
  </div>
  <div id="listBtn" class="glow">
    <font-awesome-icon icon="bars" @click="$emit('votingList')"/>
  </div>
  <div>
    <router-link :to="{ name: 'loading', params: {dane: this.userVotes} }"><font-awesome-icon v-tooltip="'Zapisz swoje głosy'" icon="save"/></router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
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
  computed: {
    userVotes () {
      return window.btoa(JSON.stringify(this.$store.state.userVotes))
    }
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
  min-height: 10vmin;
}
.logo {
  height: 10vmin;
  width: 10vmin;
}
.logo img {
  width: 100%;
  height: 100%;
}
.app-nav * {
  user-select: none;
}
.app-nav > div {
  height: 10vmin;
  width: 10vmin;
  cursor: pointer;
  padding: 1vmin;
  box-sizing: border-box;
}
.app-nav svg {
  height: 8vmin;
  width: 8vmin;
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
