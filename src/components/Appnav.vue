<template>
<div class="app-nav">
  <div :class="['logo', { menuhidden: !showMenu }]" id="logo" @click="showMenu=!showMenu"></div>

  <transition name="fade" mode="out-in">
    <div class="menu" v-show="showMenu" @click="showMenu=!showMenu">
      <router-link class="circle small" id="proj" to="/projekty">
        <check-square-icon></check-square-icon> projekty</router-link>
      <router-link class="circle small" id="staty" to="/statystyki">
        <box-icon></box-icon> staty</router-link>
      <router-link class="circle small" id="ostronie" to="/ostronie">
        <info-icon></info-icon> o stronie</router-link>
      <router-link class="circle small" id="kontakt" to="/kontakt">
        <mail-icon></mail-icon> kontakt</router-link>
    </div>
  </transition>
</div>
</template>

<script>
import {
  BoxIcon,
  CheckSquareIcon,
  InfoIcon,
  MailIcon
} from 'vue-feather-icons'

export default {
  data () {
    return {
      showMenu: false
    }
  },
  created () {
    setTimeout(() => {
      this.enter = true
    }, 1000)
  },
  components: {
    BoxIcon,
    CheckSquareIcon,
    InfoIcon,
    MailIcon
  },
  methods: {}
}
</script>

<style scoped>
.appnav{
  position: fixed;

}
.menu {
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
  z-index: 98;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
  font-variant: small-caps;

  font-weight: bold;
}
.menu a {
  position: relative;
  top: -10vmin;
}
.logo {
  position: fixed;
  bottom: 5vmin;
  right: 5vmin;
  height: 20vmin;
  width: 80vmin;
  background-image: url("./../assets/logo old.svg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 99;
  cursor: pointer;
  transition: 0.5s;


  /*background-color: #2285;*/
}

.logo:hover {
  animation: none;
  transform: scale(1.05);
}


.menuhidden {
  width: 18vmin;
  animation: pulse 10s infinite;
}

.menuhidden:hover {}

.small {
  width: 20vmin;
  height: 15vmin;
  padding: 0.5em;
  margin: 0.5em;
}

.circle {

  background: var(--color-4);

  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 0.2em black;

  /*border-radius: 1em;*/
  transition: 0.5s;
  cursor: pointer;
  color: white;
}
.circle svg{
  padding-right: 0.3em;
}

.circle:hover {
  /*box-shadow: 0 0 15px 6px #fff;*/
  background: var(--color-2);
  color: black;

}

.router-link-active {
  border-color: var(--color-3);
  /*color: black;*/
  background: var(--color-4);
}

@keyframes pulse {
  80% {
    transform: rotate(0deg);
  }
  85% {
    transform: rotate(5deg);
  }
  90% {
    transform: rotate(-5deg);
  }
}
</style>
