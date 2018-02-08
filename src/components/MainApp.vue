<template>
<div id="main-app">
  <app-nav @staty="showStats = true" @votingList="showList = !showList" @ostronie="showAbout = !showAbout"></app-nav>

  <popup v-if="showStats" @close="showStats = false">
    <h1 slot="header">Statystyki</h1>
    <stats slot="content"></stats>
  </popup>
  <popup v-if="showAbout" @close="showAbout = false">
    <h1 slot="header">O stronie <a href="/">wybornie.org</a>!</h1>
    <about slot="content"></about>
  </popup>

  <transition name="fade">
    <div v-show="this.loading" id="loading-thing"></div>
  </transition>
  <votings-list @hideList="showList = !showList" v-show="!this.isMobile || showList"></votings-list>
  <router-view></router-view>

</div>
</template>

<script>
import Popup from '@/components/generic/Popup'
import AppFooter from '@/components/AppFooter'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Voting from '@/components/Voting'
import VotingsList from '@/components/VotingsList'
import AppNav from '@/components/AppNav'

export default {
  name: 'mainapp',
  components: {
    Popup,
    AppNav,
    Stats,
    About,
    AppFooter,
    Voting,
    VotingsList
  },
  data () {
    return {
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

#main-app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

#loading-thing {
  position: fixed;
  top: 15vmin;
  left: calc(50vw - 5.5vmin);
  z-index: 99;
  height: 10vmin;
  width: 10vmin;
  border: 2vmin solid crimson;
  border-left: 2vmin solid white;
  border-bottom: 2vmin solid white;
  border-radius: 100%;
  animation: 1s rotate360 infinite ease-in-out;
  box-shadow: white 0 0 5vmin 0vmin inset, white 0 0 5vmin 0;
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
  #main-app{
    flex-direction: column;
  }
  .list-hidden {
    visibility: hidden;
  }
}
</style>
