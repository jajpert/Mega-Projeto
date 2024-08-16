<template lang="pug">
#app
  NavBar
  transition(name="fade", mode="out-in")
    router-view

</template>

<script>
import NavBar from "./components/NavBar.vue"
export default {
  name: 'App',
  components:{
    NavBar
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
body{ 
  margin: 0px;
  padding: 0px;
  font-family: Arial, Helvetica, sans-serif;
}

a{
  text-decoration: none;
}
ul{
  list-style: none;
}
#app {

}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
  background-color: yellow; /* Temporário para debug */
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  background-color: red; /* Temporário para debug */
}

</style>
