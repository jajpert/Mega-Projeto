<template lang="pug">
#app
  h1 tela principal
  nav.nav-teste
    router-link(to='/') Home
    router-link(to='/adm') Page Admin
    router-link(to='/login') Pag Login
    router-link(to='/comprar') Pag comprar
    router-link(to='/cadastro') Pag cadastro
  router-view
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">

body{ 
  background-color: #ff0;
}
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
  .nav-teste{
    display: flex;
    gap: 10px;
    justify-content: center;
  }
}
</style>
