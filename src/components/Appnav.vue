<template>
<div class="appnav">
  <div id="logo" class="links">
    <a href="#"><img src="./../assets/logo.svg"><h1>wybornie.org</h1></a>
  </div>
  <div class="links">
    <a href="#main">Projekty</a>
    <a href="#staty">Statystyki</a>
    <a href="#ostronie">O stronie</a>

  </div>
</div>
</template>

<script>
export default {
  name: 'appnav'
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


a:active {
  outline-style: solid;
}


/*a:visited {
  color: green;
}*/

a:hover {
  color: hotpink;
}
</style>
