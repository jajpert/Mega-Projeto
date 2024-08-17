<template lang="pug">
.produto-buscar
  form
    input.search-bar(name='busca' type='text' v-model='busca' placeholder="Faça sua busca")
    button#lupa(name="lupa" type="submit" @click.prevent="buscarProdutos()")
      img(src="../assets/lupa.png")
</template>

<script>
export default {
  name: "ProdutoBuscar",
  data() {
    return {
      busca: "",
    }
  },
  methods: {
    buscarProdutos() {
      const currentQuery = this.$route.query.q;
      if (this.busca && this.busca !== currentQuery) {
        this.$router.push({ query: { q: this.busca }});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.produto-buscar {
  form {
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

    #lupa {
      position: absolute;
      top: 0;
      right: 10px;
      width: 40px;
      height: 40px;
      background: none;
      border: transparent;
      cursor: pointer;

      img {
        max-width: 100%;
        height: 15px;
      }
    }
  }
}
</style>
