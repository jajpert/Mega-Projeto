<template lang="pug">
.produto-descricao-modal
  .container-grid
    .container-textos
      h3.titulo nome:
      p.propriedade.nome {{ produtoSelecionado.name}}
      h3.titulo tipo:
      p.propriedade.tipo {{ produtoSelecionado.fabricante}}
      h3.titulo descriçao:
      p.propriedade {{ produtoSelecionado.descricao}}
    .container-img
      img(:src="produtoSelecionado.img")
    .container-acoes
      p {{ formatValues(produtoSelecionado.valor) }}
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:{
    id:{
      require: true,
    },
  },
  name: "ProdutoDescricao",
  data(){
    return{

    }
  },
  methods:{
    formatValues(value){
      return value.toLocaleString('pt-BR', {style: 'currency', currency: "BRL"})
    }
  },
  computed:{
    ...mapGetters('produtos', ['produtos']),
    produtoSelecionado() {
      return this.produtos.find(produto => produto.id === this.id);
    }
  }

}
</script>
<style lang="scss" scoped>
.produto-descricao-modal{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  margin: 0;
  .container-grid{
    display: grid;
    grid-template-columns: 400px 400px 300px;
    justify-content: center;
    align-items: center;
    gap: -20px;
    .container-textos{
      .titulo{
        font-weight:bold;
        text-transform: uppercase;
        margin-bottom: 10px;
      }
      .propriedade{
        margin: 0px 0px 10px 3px;
        text-align: start;
        font-weight: 300;
        &.nome{
          text-transform: capitalize;
        }
        &.tipo{
          text-transform: capitalize;
        }
      }

    }
  }
}
</style>