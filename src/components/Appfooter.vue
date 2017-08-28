<template>
<div class="footer">
  <a href="https://www.facebook.com/wybornieorg/"><facebook-icon></facebook-icon> fb.com/wybornieorg</a>

</div>
</template>

<script>
import { FacebookIcon } from 'vue-feather-icons'

export default {
  name: 'footer',
  components: {
    FacebookIcon
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
