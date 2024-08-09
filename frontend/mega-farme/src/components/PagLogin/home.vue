<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <!-- Campos de login -->
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "PagLogin",
  methods: {
    login() {
      // Simula autenticação
      this.$store.dispatch('login');

      const redirect = this.$route.query.redirect || '/';
      this.$router.push(redirect);
    }
  }
}
</script>