<template>
  <div>
    <h1>Comprar Produto</h1>
    <button @click="comprarProduto">Comprar</button>
  </div>
</template>

<script>
export default {
  name: "PagComprar",
  methods: {
    comprarProduto() {
      if (!this.$store.getters.isAuthenticated) {
        alert('Por favor, faça o login para continuar a compra.');
        this.$router.push('/login');
      } else {
        // Lógica para a compra
      }
    }
  }
};
</script>
