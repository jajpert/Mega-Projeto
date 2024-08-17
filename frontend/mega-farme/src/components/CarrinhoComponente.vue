<template lang="pug">
.carrinho
  .container
    h2 Carrinho de Compras
    .produto-item(v-for="item in carrinho" :key="item.id")
      //- img(:src="item.produto_imagem" alt="Produto")
      p.nome {{ item.nome }}
      p.preco {{ formatValues(item.valor) }}
//- .carrinho
//-     .container
//-       h2 Carrinho de Compras
//-       p Teste de Renderização

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "CarrinhoComponente",
  computed: {
    ...mapGetters(['carrinho']),
    formatValues(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" });
    }
  }
}
</script>