<template lang="pug">
main.container-cliente
  ListaProdutos
</template>

<script>
import ListaProdutos from '../../components/ListaProdutos.vue'


export default {
  name: "HomeUsuario",
  components:{
    ListaProdutos,
  },
  data() {
    return {
    }
  }
  }

</script>


<style lang="scss" scoped>
</style>
