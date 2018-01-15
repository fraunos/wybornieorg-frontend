<template>
<div id="app">
  <app-nav @staty="showStats = true" @votingList="showList = !showList" @ostronie="showAbout = !showAbout"></app-nav>

  <popup v-if="showHello" @close="showHello = false">
    <h1 slot="header">Witaj!</h1>
    <div slot="content">
      <p>Znajdujesz się na stronie <a href="/">wybornie.org</a>! Jest to aplikacja poświęcona wyborom. Jeśli tu jesteś to za pewne zastanawiasz się na kogo zagłosować? Kto jest godny Twojego zaufania? Właśnie w tym postaram się Ci pomóc!</p>
      <p>Dzięki tej aplikacji możesz głosować zupełnie jak posłowie. Wystarczy znaleźć interesujące Cię projekty ustaw i wybrać głos 'Za' lub 'Przeciw'. Następnie, po przejściu w zakładkę Statystyk program wyświetli wyniki - w kolejności - z którym z posłów
        zgadzasz się najbardziej!</p>
      <p>Powodzenia i rozsądnych wyborów!</p>
      <h3>Wybornie!</h3>
    </div>
    </popup>

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
  <transition name="fade">
    <votings-list @hideList="showList = !showList" v-show="!this.isMobile || showList"></votings-list>
  </transition>
  <transition name="blink">
    <router-view></router-view>
  </transition>

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
  name: 'app',
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
@import url(https://fonts.googleapis.com/css?family=Lato);
#votings-list {

}

body {
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-size: 2vmin;
  background: #444;
}

#app {
  display: flex;
  flex-direction: row;
  /*height: 100vh;*/
  /*width: 100vw;*/
}

a {
  text-decoration: none;
  font-weight: bold;
  outline: none;
  color: var(--color-base);
}

a:hover {
  color: inherit;
}

a:active, svg:active{
  /* color: inherit; */
  outline: 2px solid black;
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

#loading-thing{
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
  body{
    font-size: 3.5vmin;
  }
  #app{
    flex-direction: column;
  }
  .list-hidden {
    visibility: hidden;
  }
}


</style>
