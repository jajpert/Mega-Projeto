<template lang="pug">
#app
  nav
    router-link(to='/') Go to Home
    router-link(to='/pag-admin') pg-admin
    router-link(to='/pag-cliente') pg-cliente
  router-view
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  p{
    background: #000;
    font-size: 30px;
  }
}
</style>
