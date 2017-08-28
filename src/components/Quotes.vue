<template>
<div class="quotes" v-on:click="randomQuote()" title="Kliknij, aby wylosować nowy cytat!">
  <p>{{ currentQuote.quote }}</p>
  <span>{{ currentQuote.name }}</span>
</div>
</template>

<script>
export default {
  name: 'quotes',
  data () {
    return {
      currentQuote: {},
      people: [{
        name: 'Murray Rothbard',
        quotes: [
          'A czymże innym w istocie jest państwo niż zorganizowanym bandytyzmem? Czym są podatki, jeśli nie złodziejstwem na gigantyczną, niekontrolowaną skalę? Czym jest wojna, jeśli nie masowym mordem w skali niemożliwej do osiągnięcia przez prywatną policję? Czym jest pobór, jeśli nie masowym niewolnictwem? Czy można sobie wyobrazić prywatną formację policyjną, której uszłoby na sucho popełnienie choćby maleńkiej części tego, co państwa robią bezkarnie, rutynowo, rok po roku i stulecie po stuleciu?',
          'Jeśli ktokolwiek wierzy w dobrowolny charakter podatków, niech spróbuje odmówić ich płacenia, a przekona się na własnej skórze, jak jest naprawdę.',
          'Na wolnym rynku każdy zarabia według miary własnej skuteczności w spełnianiu życzeń konsumentów. W ekonomii państwowej redystrybucji każdy zarabia proporcjonalnie do własnych możliwości ograbiania producentów.',
          'Zbrodnia jest zbrodnią, agresja jest agresją, bez względu na to, jak wielu obywateli godzi się na takie praktyki. W pojęciu większości nie ma nic świętego. Tłum dokonujący samosądu stanowi przecież większość na swoim terenie.'
        ]
      },
      {
        name: 'Ludwig von Mises',
        quotes: [
          'Celem liberalizmu jest pokojowa współpraca wszystkich ludzi, jak również pokój pomiędzy narodami. Jeśli wszędzie własność środków produkcji będzie się znajdowała w rękach prywatnych, a prawa, sądy i administracja będą traktowały obcokrajowców i obywateli na takich samych warunkach, to nie będzie miało dużego znaczenia to, gdzie przebiegają granice państw. (…) Nie będzie się już opłacało prowadzić wojen; nie będzie powodów do agresji. (…) Wszystkie narody będą mogły współistnieć w pokoju…',
          'Jeśli historia mogłaby nas czegokolwiek nauczyć, to niewątpliwie tego, że żaden naród nie stworzył wyższej cywilizacji bez poszanowania prawa do posiadania własności prywatnej.',
          'Jeśli ktoś walczy o wolny rynek i wolną konkurencję, nie staje w obronie tych, którzy są już bogaci, lecz zabiega o swobodę działania dla anonimowych ludzi, którzy niebawem zostaną przedsiębiorcami, a ich pomysłowość sprawi, że życie przyszłych pokoleń stanie się lżejsze.',
          'Korupcja to nieuchronny efekt interwencjonizmu.',
          'Naprawdę, nie ma żadnej istotnej różnicy pomiędzy nieograniczoną władzą państwa demokratycznego, a nieograniczoną władzą autokraty.',
          'Nic dziwnego, że każdy, kto miał coś nowego do zaoferowania ludzkości, nie miał niczego dobrego do powiedzenia o państwie czy o jego prawach.',
          'Nie ma w naturze niczego, co można by nazwać wolnością. Pojęcie wolności zawsze odnosi się do stosunków między ludźmi.',
          'Pracownik nie jest winien swemu pracodawcy służalczości i posłuszeństwa. Jest mu jedynie winien usługę, za którą otrzymuje zapłatę, będącą nie łaską, lecz zasłużonym wynagrodzeniem.',
          'Sławne stare opowiadania, powtarzane setki razy, że fabryki zatrudniały kobiety i dzieci, żyjące wcześniej, przed podjęciem pracy w fabrykach, w dostatecznych warunkach, są jednym z największych fałszerstw w historii. Matki, które pracowały w fabrykach nie miały co do garnka włożyć; one nie opuszczały swoich domów i ich kuchni udając się do fabryk, one poszły do fabryk, ponieważ nie miały kuchni, a jeśli je miały, to nie miały w nich czego przyrządzać. Dzieci nie przychodziły do fabryk z wygodnych ochronek. One głodowały i umierały. I całe to gadanie o nie-do-wypowiedzenia okropnościach wczesnego kapitalizmu można obalić przez tylko jedną statystykę: dokładnie w tych latach, w których brytyjski kapitalizm się rozwijał, ściśle w wieku nazwanym Rewolucją Przemysłową w Anglii, w latach od 1760 r. do 1810 r. ludność w Anglii podwoiła się, co oznacza, że setki lub tysiące dzieci – które byłyby umarły w poprzednich czasach – przeżyły i rosły.'
        ]

      }
      ]
    }
  },
  methods: {
    randomQuote () {
      let person = this.people[Math.floor(Math.random() * this.people.length)]
      this.currentQuote = {
        name: person.name,
        quote: person.quotes[Math.floor(Math.random() * person.quotes.length)]
      }
    }
  },
  created () {
    this.randomQuote()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  background-color: orange;
  padding: 10px;
  max-width: 30%;
  flex-flow: column;
  color: black;
  /*font-weight: bold;*/
  padding: 2em;

}

p {
  text-align: justify;
  font-style: italic;
}
</style>
