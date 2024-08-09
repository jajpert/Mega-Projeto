import Vue from 'vue/dist/vue.esm.js'; // Import from vue.esm.js
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false, // Gerencia o estado de autenticação
  },
  mutations: {
    SET_AUTH(state, authStatus) {
      state.isAuthenticated = authStatus;
    },
  },
  actions: {
    login({ commit }) {
      // Simula a lógica de login
      commit('SET_AUTH', true);
    },
    logout({ commit }) {
      // Simula a lógica de logout
      commit('SET_AUTH', false);
    },
  },
  getters: {
    isAuthenticated(state) {
        console.log(state.isAuthenticated);
      return state.isAuthenticated;
    },
  },
});
