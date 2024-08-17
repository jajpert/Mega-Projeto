<template lang="pug">
.container-numero-paginas
  ul
    li(v-for="pagina in paginasTotal" :key="pagina" :class="{ 'pagina-ativa': isPaginaAtiva(pagina) }")
      router-link(:to="{ query: { ...$route.query, page: pagina } }") {{ pagina }}
</template>

<script>
export default {
  props: {
    produtosTotal: {
      type: Number,
      default: 1,
    },
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    paginaAtual: Number,
  },
  computed: {
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
  },
  methods: {
    isPaginaAtiva(pagina) {
      // Verifica se a página atual é igual à página em loop ou se a query está vazia e a página é 1
      return this.$route.query.page ? parseInt(this.$route.query.page) === pagina : pagina === 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-numero-paginas {
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;

    li {
      display: inline-block;
      margin: 0 5px;

      &.pagina-ativa {
        a {
          background: rgb(217, 46, 16);
          color: #fff;
          font-weight: bold;
        }
      }

      a {
        padding: 8px 16px;
        border-radius: 3px;
        border: 1px solid rgb(217, 46, 16);
        background: transparent;
        color: rgb(217, 46, 16);
        cursor: pointer;
        transition: background 0.3s, color 0.3s;

        &:hover {
          background: rgba(217, 46, 16, 0.1);
          color: rgb(217, 46, 16);
        }
      }
    }
  }
}
</style>
