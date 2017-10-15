<template>
<div class="contact">
  <h1>Kontakt</h1>
  <p>Jeśli masz pomysł jak poprawić tę stronę napisz do mnie!</p>
  <p><a target="_blank" href="mailto:michal.marian.woloszyn@gmail.com"><mail-icon></mail-icon> michal.marian.woloszyn@gmail.com</a></p>
  <div>
  <a target="_blank" href="https://www.facebook.com/wybornieorg/"><facebook-icon></facebook-icon></a>
<a target="_blank" href="https://github.com/fraunos/"><github-icon></github-icon></a>
</div>
<div class="">
  <a target="_blank" href="https://fraunos.github.io"><droplet-icon></droplet-icon> Michał Wołoszyn</a>

</div>

</div>
</template>

<script>
import { FacebookIcon, GithubIcon, MailIcon, DropletIcon } from 'vue-feather-icons'

export default {
  data () {
    return {}
  },
  components: {
    FacebookIcon, GithubIcon, MailIcon, DropletIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contact {
}
</style>
