<template lang="pug">
main.container-cliente
    .produtos
        router-link.produto(v-for="produto in produtos || []" :key="produto.id" @click.native="selectProduto(produto)" :to="{name: 'produto', params:{id: produto.id}}")
            .container-img
                img.imagem(:src="produto.img")
                p.nome-produto {{produto.name}}
    //- p {{ nome }} <!-- Referencie o estado correto aqui -->
    //- p {{ produtos }} <!-- Verifique o valor de produtos -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "HomePage",
  computed: {
    ...mapGetters('produtos', ['produtos', 'nome'])
  },
  methods: {
    ...mapActions('produtos',['selecionaProduto']),
    selectProduto(produto){
      this.selecionarProduto(produto)
    }
  }
};
</script>


<style lang="scss" scoped>
main.container-cliente {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  .produtos {
    margin: 0 auto;
    width: 1200px;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    .produto {
      .container-img {
        border: 2px solid #000;
        border-radius: 10px;
        position: relative;
        padding-bottom: 20px;
        cursor: pointer;
        img.imagem {
          display: block;
          max-width: 180px;
        }
        .nome-produto {
          text-align: center;
          position: absolute;
          bottom: 10px;
          display: flex;
          justify-content: center;
          right: 29%;
        }
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1); /* Escurece o fundo da .container-img */
      }
    }
  }
}
</style>
