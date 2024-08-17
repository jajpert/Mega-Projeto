<template lang="pug">
.produto-descricao-modal
  .container-grid
    .container-textos
      h3.titulo nome:
      p.propriedade.nome {{ produto && produto.nome }}
      h3.titulo tipo:
      p.propriedade.tipo {{ produto && produto.nome_cientifico }}
      h3.titulo Validade:
      p.propriedade.tipo {{ produto && produto.validade }}
    .container-img
      img(:src="produto.produto_imagem" alt="img")
    .container-acoes
      p.valor {{ formatValues(produto.valor) }}
      a(v-if="isUserLoggedIn" @click="adicionarCarrinho").adicionar
        | Adcionar ao Carrinho
      router-link(to="/login" v-else).adicionar
        | Adcionar ao Carrinho
    p(v-if="adicionado").mensagem {{msg}}
</template>

<script>
import { mapGetters } from 'vuex';
import { api } from "../service.js";

export default {
  props: {
    id: {
      require: true,
    },
  },
  name: "ProdutoPage",
  data() {
    return {
      produto: "",
      imgDefault: require("../assets/pharma-remedio.png"),
      adicionado: false,
      msg: "Foi adicionado"
    }
  },
  methods: {
    formatValues(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" });
    },
    getProduto() {
      this.produto = null;
      api.get(`/produto/${this.id}`).then(response => {
        this.produto = response.data;
      }).catch(error => {
        console.error("Erro ao buscar o produto:", error);
      });
    },
    adicionarCarrinho() {
      this.$store.dispatch('addToCarrinho', this.produto);
        this.adicionado = true
      setTimeout(()=>{
        this.adicionado = false;
      },1000)
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    produtoSelecionado() {
      return this.produtos.find(produto => produto.id === this.id);
    }
  },
  created() {
    this.getProduto();
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
.container-acoes{
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  .valor{
    font-weight: 700;
    font-size:30px;
    text-align: start;
    width: 100%;
  }
  a{
    font-weight: bold;
    padding: 10px;
    align-self: flex-start;
    background: rgb(68, 187, 136);
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  a.adicionar{
    &:hover{
      background: rgba(68, 187, 136, 0.3);
    }
  }
}
.mensagem{
  top: 150px;
  right: -10px;
  position: absolute;
  transition: all 0.3s ;
  background: #4b8;
  padding: 10px;
  border-radius: 10px;
  text-align: start;
  width: 500px;
}
</style>
