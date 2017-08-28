<template>
<div class="appnav">
  <div id="logo" class="links">
    <a href="#"><img src="./../assets/logo.svg"><h1>wybornie.org</h1></a>
  </div>
  <div class="links">
    <a href="#main"><file-text-icon></file-text-icon> Projekty</a>
    <a href="#staty"><pie-chart-icon type="pie-chart"></pie-chart-icon> Statystyki</a>
    <a href="#ostronie"><info-icon type="info"></info-icon> O stronie</a>

  </div>
</div>
</template>

<script>
import { FileTextIcon, PieChartIcon, InfoIcon } from 'vue-feather-icons'

export default {
  name: 'appnav',
  components: {
    FileTextIcon, PieChartIcon, InfoIcon
  }
  // data () {
  //   return {}
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.links {
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
}

#logo {
  /*font-size: 0.6em;*/
}

h1 {
  display: inline-flex;
  margin: 0;
}

.appnav {
  justify-content: space-between;
  flex-flow: row;
  padding: 10px;
  font-size: 120%;
}

img {
  height: 64px;
}


a {
  padding: 0.4em;
}



</style>
