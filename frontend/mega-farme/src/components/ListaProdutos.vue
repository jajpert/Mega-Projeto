<template lang="pug">
section.produtos-container
  .produtos(v-if="produtos && produtos.length")
    router-link.produto(v-for="produto in produtos || []" :key="produto.id" @click.native="selectProduto(produto)" :to="{name: 'produto', params:{id: produto.id}}")
      .container-img
        img.imagem(:src="produto.produto_imagem")
        p.nome-produto {{produto.nome}}
  .nao-encontrado(v-else)
    p Busca sem resultados, procure por outro termo.
  PaginarProdutos(
    :produtosTotal="produtosTotal"
    :produtosPorPagina="produtosPorPagina"
    @pagina-mudou="mudarPagina")

</template>

<script>
import { api } from "../service.js"
import PaginarProdutos from "./PaginarProdutos.vue"

export default {
  name: "ProdutosLista",
  components:{
    PaginarProdutos
  },
  data() {
    return {
      produtos: [],
      allProdutos: [], // Armazena todos os produtos para filtragem e paginação
      produtosTotal: 0,
      produtosPorPagina: 8,
      paginaAtual: 1, // Página atual
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
    api.get('/produto') // Sem parâmetros, pega todos os produtos
      .then(response => {
        this.allProdutos = response.data;
        this.produtosTotal = this.allProdutos.length;
        this.applyFilter(); // Aplica o filtro e a paginação
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  },
  applyFilter() {
    const query = this.$route.query.q ? this.$route.query.q.toLowerCase() : '';

    // Filtra produtos com base na busca
    const produtosFiltrados = this.allProdutos.filter(produto => 
      produto.nome.toLowerCase().includes(query)
    );

    // Paginação: Calcula o índice inicial e final para a página atual
    const start = (this.paginaAtual - 1) * this.produtosPorPagina;
    const end = start + this.produtosPorPagina;

    // Atualiza os produtos exibidos com base na página e filtro
    this.produtos = produtosFiltrados.slice(start, end);
  },
  mudarPagina(pagina) {
    if (pagina !== this.paginaAtual) {
      this.paginaAtual = pagina;
      this.applyFilter();

      // Atualiza a URL com o novo número da página
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.paginaAtual
        }
      });
    }
  }
},
created() {
  const pageFromUrl = parseInt(this.$route.query.page, 10);
  this.paginaAtual = pageFromUrl ? pageFromUrl : 1;
  this.getProdutos(); // Faz o get ao carregar a página
},
watch: {
  '$route.query.q': function() {
    this.paginaAtual = 1; // Reseta para a primeira página ao filtrar
    this.applyFilter();
  },
  '$route.query.page': function(newPage) {
    const pageNum = parseInt(newPage, 10);
    if (!isNaN(pageNum) && pageNum !== this.paginaAtual) {
      this.paginaAtual = pageNum;
      this.applyFilter();
    }
  }
}
}
</script>


<style lang="scss" scoped>
section.produtos-container {
  height: 100%;
  width: 1200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 50px;
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
