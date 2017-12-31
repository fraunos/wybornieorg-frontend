<template>
<div class="app-nav">
    <div :class="['logo']" id="logo"></div>
    <check-square-icon @click="$emit('staty')" />
    <list-icon id="listBtn" @click="$emit('votingList')" />
    <arrow-left-icon @click="switchVoting(-1)" />
    <arrow-right-icon @click="switchVoting(1)" />
    <a target="_blank" href="https://www.facebook.com/wybornieorg"><facebook-icon /></a>
    <a target="_blank" href="https://github.com/fraunos/wybornieorg-frontend"><github-icon /></a>
</div>
</template>

<script>
import {
  BoxIcon,
  CheckSquareIcon,
  FacebookIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ListIcon,
  GithubIcon
} from 'vue-feather-icons'

export default {
  name: 'nav',
  data () {
    return {
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
    BoxIcon,
    CheckSquareIcon,
    FacebookIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ListIcon,
    GithubIcon
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
.app-nav * {
  height: 10vmin;
  width: 10vmin;
  user-select: none;
  cursor: pointer;
  transform: scale(0.9);
}
.app-nav > * {
  color: var(--color-0);
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
