<template>
<div class="contact">
  <h1>Kontakt</h1>
  <p>Jeśli masz pomysł jak poprawić tę stronę napisz do mnie!</p>
  <p><a target="_blank" href="mailto:michal.marian.woloszyn@gmail.com"><mail-icon></mail-icon></a></p>
  <div>
  <a target="_blank" href="https://www.facebook.com/wybornieorg/"><facebook-icon></facebook-icon></a>
<a target="_blank" href="https://github.com/fraunos/wybornieorg-frontend"><github-icon></github-icon></a>
</div>
  <a target="_blank" href="https://fraunos.github.io"><droplet-icon></droplet-icon></a>
  <p>Kropla drąży skałę!</p>

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
  display: flex;
  flex-direction: column;
  align-items: center;
}
svg{
  transform: scale(2);
  margin: 1em;
}
</style>
