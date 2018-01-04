<template>
<div>
  <!-- <h1>Wczytywanie danych, proszę czekać</h1> -->
</div>
</template>

<script>

export default {
  props: ['dane'],
  created () {
    this.$store.commit('loadSavedData', JSON.parse(window.atob(this.dane)))
    // browser.bookmarks.create({title: 'wybornie.org', url: location.href})
  },
  methods: {
  }
}
</script>
