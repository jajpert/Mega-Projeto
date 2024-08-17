// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('authToken') || '',
    isUserLoggedIn: !!localStorage.getItem('authToken'),
    carrinho: [] // Adicione o estado do carrinho
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('authToken', token);
      state.isUserLoggedIn = !!token;
    },
    LOGOUT(state) {
      state.token = '';
      localStorage.removeItem('authToken');
      state.isUserLoggedIn = false;
    },
    ADD_TO_CARRINHO(state, produto) {
      state.carrinho.push(produto); // Adiciona o produto ao carrinho
    }
  },
  actions: {
    login({ commit }, { email, senha }) {
      return axios.post('http://localhost:3001/login', { email, senha })
        .then(response => {
          const { token } = response.data;
          commit('SET_TOKEN', token);
          return response;
        })
        .catch(error => {
          console.error('Erro ao fazer login:', error.response.data);
          throw error;
        });
    },
    addToCarrinho({ commit }, produto) {
      commit('ADD_TO_CARRINHO', produto);
    }
  },
  getters: {
    getToken: state => state.token,
    isUserLoggedIn: state => state.isUserLoggedIn,
    carrinho: state => state.carrinho
  }
});

export default store;
