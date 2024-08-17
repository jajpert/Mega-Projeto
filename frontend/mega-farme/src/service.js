import axios from 'axios';
import store from './store'; // Importa a store do Vuex

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // URL base da API
});

// Adiciona um interceptor para incluir o token no cabeçalho
axiosInstance.interceptors.request.use(config => {
  const token = store.getters.getToken; // Obtém o token da store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Inclui o token no cabeçalho
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Funções para fazer requisições HTTP
export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, data) {
    return axiosInstance.post(endpoint, data);
  },
  logout() {
    return axiosInstance.post('/logout') // Ajuste o endpoint conforme necessário
      .then(() => {
        store.commit('LOGOUT'); // Atualiza o estado do Vuex
      })
      .catch(error => {
        console.error("Erro ao fazer logout:", error);
      });
  }
};
