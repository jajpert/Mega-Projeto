import Vue from 'vue';
import App from './App.vue';
import router from './router.js'; // Importar o router
import store from './store/index.js'; // Importar o router
import PaginaCarregando from "./components/PaginaCarregando.vue"

Vue.config.productionTip = false;
Vue.component("PaginaCarregando", PaginaCarregando)
new Vue({
  store,
  router, // Registrar o router
  render: h => h(App),
}).$mount('#app');
