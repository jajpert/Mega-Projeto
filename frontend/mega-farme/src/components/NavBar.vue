<template lang="pug">
nav.nav-bar
  header.header-nav
    router-link(to="/usuario" v-if="isUserLoggedIn").logo-container
      img.logo(:src="logo")
    router-link(to="/"  v-else).logo-container
      img.logo(:src="logo") 
    .search-container
      ProdutoBuscar(v-if="!isRouteLogin")
    router-link(to="/carrinho" v-if="isUserLoggedIn") Carrinho
    router-link.nav-items(to="/login" v-if="!isUserLoggedIn")
      img(:src="user")
    button(v-if="isUserLoggedIn" @click="logout").out Sair
</template>


<script>
import ProdutoBuscar from './ProdutoBuscar.vue';
import { mapGetters } from 'vuex';

export default {
  name: "NavBar",
  components: {
    ProdutoBuscar
  },
  data() {
    return {
      logo: require("../assets/logo.png"),
      user: require("../assets/user.png"),
      valorPesquisado: null,
    }
  },
  methods: {
    navigateToHome() {
      if (this.$route.path === '/') {
        this.$root.$emit('getProdutos');
      } else {
        this.$router.push('/');
      }
    },
    logout() {
      this.$store.commit('LOGOUT');
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    isRouteLogin() {
      return this.$route.path === "/login";
    }
  }
}
</script>


<style lang="scss" scoped>
nav.nav-bar {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 40px 10px 50px;
  border-bottom: 4px solid rgb(217, 46, 16);
  header.header-nav {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-container {
      max-width: 100%;
      height: 100%;
      .logo {
        display: block;
        width: 50px;
        height: 50px;
      }
    }
    .search-container {
      width: 70%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .search-bar {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 2px solid rgb(217, 46, 16);
        color: #000;
        font-weight: bold;
        &:active {
          background: rgba($color: #000000, $alpha: 0.1);
        }
        &:focus {
          border: 2px solid rgb(217, 46, 16);
          background: rgba($color: #000000, $alpha: 0.06);
          outline: none;
        }
      }
    }
    .nav-items {
      display: flex;
      gap: 30px;
      height: 50px;
      width: 50px;
      background: rgb(217, 46, 16);
      img{
        max-width: 100%;
        height: 40px;
        margin: 4px auto;
      }
    }
      button.out{
        font-weight: bold;
        background: red;
        padding: 10px;
        border-radius: 10px;
        color: #fff;
      }
  }
}
</style>
