<template lang="pug">
#app
  NavBar
  transition(mode="out-in")
    router-view
</template>

<script>
import NavBar from "./components/NavBar.vue"
export default {
  name: 'App',
  components:{
    NavBar
  },
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
  color: #000;
}
ul{
  list-style: none;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-active, .v-leave-to-active {
  transition: all 0.3s;
}
</style>
