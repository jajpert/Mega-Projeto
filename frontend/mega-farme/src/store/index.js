import Vue from 'vue'; // Import from vue.esm.js
import Vuex from 'vuex';
import produtos from './modules/produtos.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    produtos
  }
});
