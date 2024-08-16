<template lang="pug">
main.container-cliente
  .produtos
    p.aviso {{ produtos.length }} resultados encontrados
    router-link.produto(v-for="produto in produtos || []" :key="produto.id" @click.native="selectProduto(produto)" :to="{name: 'produto', params:{id: produto.id}}")
      .container-img
        img.imagem(:src="produto.produto_imagem")
        p.nome-produto {{produto.nome}}
</template>

<script>
import { api } from "../service.js"

export default {
  data() {
    return {
      produtos: [],
      allProdutos: [], // Armazena todos os produtos para filtragem
    }
  },
  computed: {
    url() {
      let queryString = '';
      for (let key in this.$route.query) {
        queryString += `&${key}=${encodeURIComponent(this.$route.query[key])}`;
      }
      return queryString ? `/produto?_limit=10${queryString}` : '/produto?_limit=10';
    }
  },
  methods: {
    getProdutos() {
      api.get(this.url).then(response => {
        this.allProdutos = response.data;
        this.applyFilter(); // Aplica o filtro ao receber os produtos
      }).catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
    },
    applyFilter() {
      const query = this.$route.query.q ? this.$route.query.q.toLowerCase() : '';
      this.produtos = this.allProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(query)
      );
    }
  },
  watch: {
    // Observa mudanças na URL e atualiza os produtos
    '$route.query.q': 'applyFilter',
    '$route.query': 'getProdutos' // Para garantir que o método seja chamado se outros parâmetros de consulta mudarem
  },
  created() {
    this.getProdutos();
  }
}
</script>


<style lang="scss" scoped>
main.container-cliente {
  height: 800px;
  width: 1200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 50px;
  margin-top: 50px;
  margin-bottom: 100px;
  .produtos {
    margin: 0 auto;
    width: 1200px;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
      p.aviso{
        position: absolute;
        top: 120px;

      }
    .produto {
      text-decoration: none;
      color: #000;
      font-weight: 600;
      .container-img {
        border: 2px solid #000;
        border-radius: 10px;
        position: relative;
        padding-bottom: 20px;
        cursor: pointer;
        img.imagem {
          display: block;
          max-width: 180px;
          overflow: hidden;
        }
        .nome-produto {
          text-align: center;
          position: absolute;
          bottom: 10px;
          display: flex;
          justify-content: center;
          right: 29%;
        }
        &:hover{
          border: 2px solid rgb(217, 46, 16);
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.1); /* Escurece o fundo da .container-img */
      }
      }


    }
  }
}
</style>
