<template lang="pug">
section.produtos-container
  transition
    .verificacao(v-if="!loading && produtos" key="produtos")
      .produtos(v-if="produtos && produtos.length")
        router-link.produto(v-for="produto in produtos" :key="produto.id" @click.native="selectProduto(produto)" :to="{ name: 'produto', params: { id: produto.id } }")
          .container-img
            img.imagem(:src="produto.produto_imagem")
            p.nome-produto {{ produto.nome }}
      .nao-encontrado(v-else)
        p Busca sem resultados, procure por outro termo.
      PaginarProdutos.sessao-paginar(
        v-if="produtosFiltrados.length > produtosPorPagina"
        :produtosTotal="produtosTotal"
        :produtosPorPagina="produtosPorPagina"
        :paginaAtual="paginaAtual"
        @pagina-mudou="mudarPagina" )
    PaginaCarregando(v-if="loading" key="carregando") // Exibe o componente de carregamento quando loading é true
</template>

<script>
import { api } from "../service.js";
import PaginarProdutos from "./PaginarProdutos.vue";
import PaginaCarregando from "./PaginaCarregando.vue";

export default {
  name: "ProdutosLista",
  components: {
    PaginarProdutos,
    PaginaCarregando
  },
  data() {
    return {
      produtos: [],
      allProdutos: [],
      produtosTotal: 0,
      produtosPorPagina: 8,
      paginaAtual: 1,
      loading: true, // Estado de carregamento inicial
      produtosFiltrados: [], // Armazena os produtos filtrados
    };
  },
  computed: {
    url() {
      let queryString = '';
      for (let key in this.$route.query) {
        queryString += `&${key}=${encodeURIComponent(this.$route.query[key])}`;
      }
      return queryString ? `/produto?${queryString}` : '';
    }
  },
  methods: {
    getProdutos() {
      this.loading = true; // Inicia o carregamento
      this.produtos = null;
      api.get('/produto')
        .then(response => {
          this.allProdutos = response.data;
          this.produtosTotal = this.allProdutos.length;
          this.applyFilter();
        })
        .catch(error => {
          console.error("Erro ao buscar produtos:", error);
        })
        .finally(() => {
          this.loading = false; // Define loading como false após a resposta da API
        });
    },
    
    applyFilter() {
      const query = this.$route.query.q ? this.$route.query.q.toLowerCase() : '';

      // Filtra produtos com base na busca
      this.produtosFiltrados = this.allProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(query)
      );

      // Paginação: Calcula o índice inicial e final para a página atual
      const start = (this.paginaAtual - 1) * this.produtosPorPagina;
      const end = start + this.produtosPorPagina;

      // Atualiza os produtos exibidos com base na página e filtro
      this.produtos = this.produtosFiltrados.slice(start, end);
    },
    mudarPagina(pagina) {
      if (pagina !== this.paginaAtual) {
        this.paginaAtual = pagina;
        this.applyFilter();

        // Atualiza a URL com o novo número da página
        this.$router.push({
          query: {
            ...this.$route.query,
            page: pagina
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
    url() {
      this.getProdutos();
    },
    '$route.query.page': function(newPage) {
      const pageNum = parseInt(newPage, 10);
      if (!isNaN(pageNum) && pageNum !== this.paginaAtual) {
        this.paginaAtual = pageNum;
        this.applyFilter();
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/') {
      this.paginaAtual = 1;
      this.getProdutos(); // Atualiza os produtos
    }
    next();
  },
  mounted() {
    // Ouve o evento emitido pelo componente NavBar
    this.$root.$on('getProdutos', () => {
      this.getProdutos();
    });
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
  position: relative;
  .produtos {
    margin: 0 auto;
    width: 1200px;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    p.aviso {
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
        &:hover {
          border: 2px solid rgb(217, 46, 16);
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.1); /* Escurece o fundo da .container-img */
        }
      }
    }
  }
  .sessao-paginar {
    bottom: -420px;
    position: absolute;
    padding: 20px;
    right: 50%;
    left: 50%;
  }
}
</style>
