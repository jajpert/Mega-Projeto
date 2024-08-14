import Vue from 'vue';
import App from './App.vue';
import router from './router.js'; // Importar o router
import store from './store.js'; // Importar o router

Vue.config.productionTip = false;

new Vue({
  store,
  router, // Registrar o router
  render: h => h(App),
}).$mount('#app');
