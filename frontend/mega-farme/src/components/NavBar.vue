<template lang="pug">
nav.nav-bar
  header.header-nav
    router-link(to="/").logo-container
      img.logo(:src="logo") 
    .search-container
      //- input.search-bar(type="text" name="search" id="search" v-model="valorPesquisado")
      ProdutoBuscar
    .nav-items
      .orders
        .nav-item
      .account
        .nav-item
      .cart
        .nav-item

</template>

<script>
import ProdutoBuscar from './ProdutoBuscar.vue';
export default {
  name: "NavBar",
  components: {
    ProdutoBuscar
  },
  data(){
    return{
      logo: require("../assets/logo.png"),
      valorPesquisado: null,
    }
  }
};
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
      .orders,
      .account,
      .cart {
        .nav-item {
          width: 40px;
          height: 40px;
          background: #000;
        }
      }
    }
  }
}
</style>
