<template>
<div class="footer">
  <div class="links">
    <h4>Linki</h4>
    <a target="_blank" href="https://www.facebook.com/wybornieorg/"><facebook-icon></facebook-icon> fb.com/wybornieorg</a>
    <a target="_blank" href="https://github.com/fraunos/wybornieorg-frontend"><github-icon></github-icon> github.com/fraunos/wybornieorg-frontend</a>
    <a target="_blank" href="https://github.com/fraunos/wybornieorg-backend"><github-icon></github-icon> github.com/fraunos/wybornieorg-backend</a>
  </div>
  <div class="links">
    <h4>Kontakt</h4>
    <a target="_blank" href="mailto:michal.marian.woloszyn@gmail.com"><mail-icon></mail-icon> michal.marian.woloszyn@gmail.com</a>
  </div>
  <div class="links">
    <h4>Polecane</h4>
    <a target="_blank" href="https://sejmlog.pl/"><globe-icon></globe-icon> sejmlog.pl</a>
  </div>
</div>
</template>

<script>
import { FacebookIcon, GithubIcon, MailIcon, GlobeIcon } from 'vue-feather-icons'
export default {
  components: {
    FacebookIcon, GithubIcon, MailIcon, GlobeIcon
  }
  // data () {
  //   return {}
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
