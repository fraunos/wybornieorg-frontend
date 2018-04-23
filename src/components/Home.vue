<template>
<div class="home">
  <div class="header">
    <div class="logo">
      <a href="/"><img src="/static/img/icons/logo.svg" alt=""> wybornie.org</a>
      <div class="social-links">
        <a target="_blank" href="https://discord.gg/M4xp9NZ"><font-awesome-icon :icon="['fab', 'discord']"/></a>
        <a target="_blank" href="https://trello.com/b/EEORaGl3/wybornieorg-rozw%C3%B3j"><font-awesome-icon :icon="['fab', 'trello']"/></a>
        <a target="_blank" href="https://www.facebook.com/wybornieorg"><font-awesome-icon :icon="['fab', 'facebook']"/></a>
        <a target="_blank" href="https://github.com/fraunos/wybornieorg-frontend"><font-awesome-icon :icon="['fab', 'github']"/></a>
      </div>
    </div>
    <router-link class="aplikacja" :to="{ name: 'voting', params: {} }">Przejdź do aplikacji!</router-link>
  </div>
  <video src="https://fraunos.keybase.pub/wybornieorg/wybornie.webm" controls controlsList="nodownload"></video>

  <div class="">
    <h1>Witaj!</h1>
    <p>Znajdujesz się na stronie <a href="/">wybornie.org</a>! Jest to aplikacja poświęcona wyborom. Jeśli tu jesteś to za pewne zastanawiasz się na kogo zagłosować? Kto jest godny Twojego zaufania? Właśnie w tym postaram się Tobie pomóc!</p>
    <p>Dzięki tej aplikacji możesz głosować zupełnie jak posłowie. Wystarczy znaleźć interesujące Cię projekty ustaw i wybrać głos 'Za' lub 'Przeciw'. Następnie, po przejściu w zakładkę „Statystyki” program wyświetli wyniki - w kolejności - z którym z posłów
      zgadzasz się najbardziej!</p>
    <p>Powodzenia i rozsądnych wyborów!</p>
    <h3>Wybornie!</h3>
  </div>
  <!-- <router-link class="aplikacja" :to="{ name: 'main-app' }"><img src="/static/img/icons/logo.svg" alt="">Przejdź do aplikacji!</router-link> -->

  <!-- <about></about> -->
  <div class="">
    <h2>Co charakteryzuje <a href="/">wybornie.org</a>?</h2>
    <ul>
      <li>neutralność - opiera się na danych publicznych, nie zawiera opinii autora</li>
      <li>bezpieczeństwo - nie pobiera danych od użytkownika, nie ma rejestracji, nie ma skryptów śledzących, reklam</li>
      <li>otwartość - ma otwarty kod źródłowy</li>
      <li>kompatybilność - działa na wszystkich urządzeniach</li>
    </ul>
  </div>
  <!-- <div class="support">
    <h2>Serwis wspierają</h2>
    <div class="supporters brands">
      <a href="https://mamprawowiedziec.pl/"><img src="https://mamprawowiedziec.pl/elementy/mamprawowiedziec-540.png" alt="MamPrawoWiedziec.pl"></a>
      <a href="https://kodujdlapolski.pl/"><img src="https://kodujdlapolski.pl/wp-content/themes/kdp/images/logo.png" alt="kodujdlapolski.pl"></a>
    </div>
  </div> -->
  <div class="brands">
    <h2>Ta aplikacja nigdy nie powstałaby, gdyby nie twórcy wolnego oprogramowania</h2>

    <a target="-_blank" href="https://distrowatch.com/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Classic_flat_look_v1.1.svg" alt="">
    </a>
    <a target="-_blank" href="https://atom.io/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Atom_editor_logo.svg/1118px-Atom_editor_logo.svg.png" alt="">
    </a>
    <a target="-_blank" href="https://vuejs.org/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" alt="">
    </a>
    <a target="-_blank" href="https://nodejs.org/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="">
    </a>
    <a target="-_blank" href="https://www.postgresql.org/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="">
    </a>
    <a target="-_blank" href="http://www.latofonts.com/">Lato</a>
  </div>
  <div class="brands">
    <h2>Media o projekcie</h2>
    <a href="http://antyweb.pl/wybornie-org-glosuj-na-projekty-ustaw/"><img src="https://static01.helion.com.pl/helion/img/rozne/patroni/PODSTA/AW_logo.jpg" alt=""></a>
  </div>
</div>
</template>

<script>
import About from '@/components/About'

export default {
  components: {
    About
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  width: 100vmin;
  padding: 5vmin;
}
.home > div {
  box-shadow: hsla(0, 0%, 0%, .1) 0 1vmin 2vmin 0;
  margin: 2vmin;
  padding: 2vmin;
  border-radius: 1vmin;
}
.logo {
  display: flex;
  flex-direction: column;
  width: auto;
  align-self: flex-start;
}
.logo > * {
  font-weight: 900;
}
.logo > a {
  display: flex;
  align-items: center;
}
.logo img {
  margin: 0 .25em .25em 0;
}
video{
  width: 100%;
  border-radius: 1vmin;
  box-shadow: hsl(0, 0%, 90%) 0 1vmin 2vmin 0;
}
.header{
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  background: hsl(0, 0%, 25%);
  font-size: 200%;
  color: white;
}
.header > *{
  margin: 1vmin;
}
.social-links {
  display: flex;
  justify-content: space-between;
}
.aplikacja {
  display: flex;
  align-items: center;
  color: white;
  background: var(--color-base);
  padding: .5em;
  border-radius: 1vmin;
}
.aplikacja:hover {
  background: white;
  color: var(--color-base);
}
div{
  width: 100%;
}
img{
  max-width: 70vmin;
  max-height: 10vmin;
}
.brands {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.brands img{
  margin: 2vmin;
}
</style>
