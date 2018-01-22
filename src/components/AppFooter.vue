<template>
<div class="footer">
  <h1>Kontakt</h1>
  <p>Jeśli masz pomysł jak poprawić tę stronę, napisz do mnie!</p>
  <div class="links">
    <a target="_blank" href="https://www.facebook.com/wybornieorg/">
      <facebook-icon /></a>
    <a target="_blank" href="https://github.com/fraunos/wybornieorg-frontend">
      <github-icon /></a>
    <!-- <p>Jeśli masz pomysł jak poprawić tę stronę, napisz do mnie!</p> -->
    <a target="_blank" href="mailto:michal.marian.woloszyn@gmail.com">
      <mail-icon /></a>
  </div>
</div>
</template>

<script>
export default {
  components: {
  }
  // data () {
  //   return {}
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer{
    background-color: dimgray;
    color: white;
    width: 100%;
  }
  .links a{
    color: white;
  }
</style>
