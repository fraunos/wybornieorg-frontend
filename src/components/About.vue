<template>
<div class="about">
  <div class="social-links">
    <a target="_blank" href="https://discord.gg/M4xp9NZ"><font-awesome-icon :icon="['fab', 'discord']"/></a>
    <a target="_blank" href="https://trello.com/b/X1Jp1EXO/wybornieorg-nazwy-zwyczajowe-projekt%C3%B3w"><font-awesome-icon :icon="['fab', 'trello']"/></a>
    <a target="_blank" href="https://trello.com/b/EEORaGl3/wybornieorg-rozw%C3%B3j"><font-awesome-icon :icon="['fab', 'trello']"/></a>
    <a target="_blank" href="https://www.facebook.com/wybornieorg"><font-awesome-icon :icon="['fab', 'facebook']"/></a>
    <a target="_blank" href="https://www.facebook.com/groups/766936056847305/"><font-awesome-icon :icon="['fab', 'facebook']"/></i></a>
    <a target="_blank" href="https://github.com/fraunos/wybornieorg-frontend"><font-awesome-icon :icon="['fab', 'github']"/></a>
    <a target="_blank" href="https://github.com/fraunos/wybornieorg-backend"><font-awesome-icon :icon="['fab', 'github']"/></a>
  </div>

  <p>Projekt ma na celu zwiększenie odpowiedzialności posłów za działania podejmowane podczas pełnienia kadencji w sejmie.</p>
  <p>Aplikacja pobiera wszystkie projekty (uchwalone lub odrzucone) ze strony sejmu <a target="_blank" href="http://www.sejm.gov.pl/Sejm8.nsf/page.xsp/przeglad_projust">przegląd projektów ustaw</a> oraz odpowiednich stron <a target="_blank" href="http://www.sejm.gov.pl/Sejm8.nsf/page.xsp/archiwum">archiwum</a>, a następnie pozwala zagłosować
    na nie wyświetlając przy tym wszelkie zebrane informacje, by ułatwić wybór. Po zagłosowaniu na wybrane przez siebie projekty użytkownik może przejść do podstrony Statystyki, by zobaczyć z którymi z posłów i ugrupowań najbardziej się zgadza.</p>
  <p>Autor strony przyłożył wszelkich starań przy projektowaniu aplikacji by zachować:
    <ul>
      <li>bezpieczeństwo - żadne dane użytkownika nie są rejestrowane i przesyłane na serwer</li>
      <li>obiektywność - aplikacja wyświetla i przetwarza tylko publiczne dane</li>
      <li></li>
    </ul>
  </p>

  <h2><a target="_blank" href="https://trello.com/b/EEORaGl3/wybornieorg">Postęp prac</a></h2>
  <div id="trello">
    <div id="dozrobienia" class="trello-list">
      <h3>W trakcie</h3>
      <ul>
        <li v-for="item in todo">{{item.name}}</li>
      </ul>
    </div>
    <div id="ukonczono" class="trello-list">
      <h3>Ukończono</h3>
      <ul>
        <li v-for="item in done">{{item.name}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      todo: null,
      done: null
    }
  },
  created () {
    this.fetchTrelloData()
  },
  components: {
  },
  methods: {
    fetchTrelloData () {
      this.$http.get('https://api.trello.com/1/boards/59e5eea27c51ae318c5fb7a2/cards').then(response => {
        this.todo = response.body.filter((item) => {
          return item.idList === '59e5f37e78966b943012e1d2'
        })
        this.done = response.body.filter((item) => {
          return item.idList === '59e5f3835d4cb88f28d42234'
        })
      }, response => {
        // error callback
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#trello {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.social-links svg{
  width: 2em;
  height: 2em;
}
.social-links {
  display: flex;
  justify-content: space-around;
}
a {
  white-space: nowrap;
}
</style>
