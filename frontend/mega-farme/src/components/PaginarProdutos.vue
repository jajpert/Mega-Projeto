<template lang="pug">
.container-numero-paginas
  ul
    li(v-for="pagina in paginasTotal" :key="pagina")
      button(@click="$emit('pagina-mudou', pagina)") {{ pagina }}
</template>

<script>
export default {
  props: {
    produtosTotal: Number,
    produtosPorPagina: Number
  },
  computed: {
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina
      return total !== Infinity ? Math.ceil(total) : 0
    }
  }
}
</script>
