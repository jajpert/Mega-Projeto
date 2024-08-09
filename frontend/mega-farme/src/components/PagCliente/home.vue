<template>
  <div>
    <!-- Conteúdo da página do cliente -->
    <button v-if="isAuthenticated" @click="goToMyAccount">Minha Conta</button>
    <button v-if="isAuthenticated" @click="goToBuy">Comprar</button>
  </div>
</template>

<script>
export default {
  name: "PagClient",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    goToMyAccount() {
      this.$router.push({ name: 'my-account' });
    },
    goToBuy() {
      this.$router.push({ name: 'buy' });
    },
  },
};
</script>