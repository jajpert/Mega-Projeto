<template lang="pug">
#app
  NavBar
  router-view
</template>

<script>
import NavBar from "./components/navegacao/NavBar.vue"
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
</style>
