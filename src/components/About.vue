<template>
<div class="about">
  <h1>O stronie <a href="#">wybornie.org</a>!</h1>
  <p>Aplikacja pobiera wszystkie projekty (uchwalone lub odrzucone) ze strony sejmu <a target="_blank" href="http://www.sejm.gov.pl/Sejm8.nsf/page.xsp/przeglad_projust">przegląd projektów ustaw</a> oraz odpowiednich stron <a href="http://www.sejm.gov.pl/Sejm8.nsf/page.xsp/archiwum">archiwum</a>, a następnie pozwala zagłosować
    na nie wyświetlając przy tym wszelkie zebrane informacje, by ułatwić wybór. Po zagłosowaniu na wybrane przez siebie projekty użytkownik może przejść do podstrony Statystyki, by zobaczyć z którymi z posłów i ugrupowań najbardziej się zgadza.</p>
  <p>Autor strony przyłożył wszelkich starań przy projektowaniu aplikacji by zachować:
    <ul>
      <li>bezpieczeństwo danych użytkownika - żadne dane nie są rejestrowane i przesyłane na serwer</li>
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
  components: {},
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
  flex-direction: row;
  justify-content: space-between;
}

.trello-list+.trello-list {
  margin-left: 2em;
}

a {
  white-space: nowrap;
}
</style>
