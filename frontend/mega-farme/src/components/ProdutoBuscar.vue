<template lang="pug">
.produto-buscar
  form
    input.search-bar(name='busca' type='text' v-model='busca')
    input#lupa(name='lupa' type='submit' value="Buscar" @click.prevent="buscarProdutos()")


</template>

<script>
export default {
  name: "ProdutoBuscar",
  data(){
    return{
      busca: "",
    }
  },
  methods:{
    buscarProdutos(){
      if(this.busca) {
        this.$router.push({query: {q: this.busca}}).catch(err => {
            // Ignora o erro de navegação duplicada
            if (err.name !== 'NavigationDuplicated') {
              // Se o erro não for NavigationDuplicated, você pode lidar com ele aqui
              console.error(err);
            }
          });
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.produto-buscar{
form{
  position: relative;
  width: 900px;
  height: 35px;
    .search-bar {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 2px solid rgb(217, 46, 16);
      color: #000;
      font-weight: bold;
      text-align: center;
      &:active {
        background: rgba($color: #000000, $alpha: 0.1);
      }
      &:focus {
        border: 2px solid rgb(217, 46, 16);
        background: rgba($color: #000000, $alpha: 0.02);
        outline: none;
      }
    }
    #lupa{
      position: absolute;
      top: 8px;
      right: 10px;
    }
}
}
</style>