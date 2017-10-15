<template>
<div class="appnav">


  <div :class="['logo', { menuhidden: !showMenu }]" id="logo" @click="showMenu=!showMenu"></div>

  <transition name="fade" mode="out-in">
    <div class="menu" v-show="showMenu" @click="showMenu=!showMenu">
      <router-link class="circle small" id="proj" to="/projekty"><check-square-icon></check-square-icon> projekty</router-link>
      <router-link class="circle small" id="staty" to="/statystyki"><box-icon></box-icon> staty</router-link>
      <router-link class="circle small" id="ostronie" to="/ostronie"><info-icon></info-icon> o stronie</router-link>
      <router-link class="circle small" id="kontakt" to="/kontakt"><mail-icon></mail-icon> kontakt</router-link>
    </div>
  </transition>
</div>
</template>

<script>
import { BoxIcon, CheckSquareIcon, InfoIcon, MailIcon } from 'vue-feather-icons'

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
    BoxIcon, CheckSquareIcon, InfoIcon, MailIcon
  },
  methods: {
    boom () {
      alert('boom')
    }
  }
}
</script>

<style scoped>

.menu {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  z-index: 1;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;

  font-weight: bold;
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



.menuhidden {
  width: 18vmin;
  animation: pulse 10s infinite;
}
.menuhidden:hover {
}

/*#proj{
  left: calc(60%);
}
#staty{
  left: calc(40%);
}
#ostronie{
  left: calc(20%);
}*/

.small {
  /*width: 15vmin;*/
  height: 15vmin;
  padding: 0.5em;
  margin: 1em;
}

.circle {
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1em;
  border: solid 0.2em;
  transition: 0.5s;
  cursor: pointer;
}

.circle:hover {
  box-shadow: 0 0 15px 6px #fff;
}

.circle:active {
  background-color: rgba(200, 100, 100, 1);
  /*animation: rotate(360deg) scale(0.1, 0.1);*/
}

.router-link-exact-active {
    color: red;
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
  100% {
    transform: rotate(0deg);
  }
}

</style>
