<template>
<div class="loaded-data">
  <div class="">
    <div class="hint">
      <h3><font-awesome-icon icon="lightbulb"/> Wskazówka!</h3>
      Zapisz tę stronę w zakładce <font-awesome-icon icon="bookmark"/> żeby móc powrócić do swoich głosów!
    </div>
    <div class="button-confirm" @click="confirm()">
      <font-awesome-icon icon="check-circle"/> Wczytaj głosy
    </div>
  </div>
  <div class="votes-container">
    <h1>Zachowane głosowania</h1>
    <div v-if="!Object.keys(daneP).length" class="">
      Coś tutaj pusto! Chyba nie ma żadnych głosów!
    </div>
    <div v-else class="votes">
      <div v-for="(data, key) in daneP" :class="['vote', data === 1 ? 'za' : 'przeciw']">
        {{key}}
        <!-- <div @click="set(data, key)">{{key}}</div> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['dane'],
  data () {
    return {
    }
  },
  computed: {
    daneP () {
      let data = JSON.parse(window.atob(this.dane))
      for (let variable in data) {
        data[variable] = data[variable] === 'Za' ? 1 : data[variable] === 'Przeciw' ? -1 : data[variable]
      }
      return data
    }
  },
  methods: {
    confirm () {
      this.$store.commit('loadSavedData', this.daneP)
      this.$router.push({ name: 'voting' })
    },
    set (data, key) {
      this.$set(this.daneP, key, data * -1)
    }
  }
}
</script>

<style scoped>
  div{
    word-wrap: break-word;
  }
  .loaded-data {
    margin: 5vmin;
    display: flex;
  }
  .hint{
    background: white;
    padding: 1em;
    border-radius: 1vmin;
  }

  .votes{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* background-color: white; */
  }
  .votes-container{
    padding: 0 5vmin;
  }
  .votes:after {
  content: "";
  flex: auto;
  }
  .vote{
    border-radius: 1vmin;
    padding: .2em .3em;
    margin: .2em;
    background-color: #bbb;
    font-weight: bold;
  }
  .za {
    color: green;
  }
  .przeciw {
    color: red;
  }
  #saved-data {
    width: 30vmin;
    height: 30vmin;
  }
  .button-confirm {
    cursor: pointer;
    font-size: 3em;
    color: var(--color-base);
  }
</style>
