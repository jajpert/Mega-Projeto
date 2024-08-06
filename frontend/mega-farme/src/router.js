// src/router.js
import Vue from 'vue';
import Router from 'vue-router';

console.log(Vue);
console.log(Router);

import LoginPag from './components/Login/home.vue';
import PagAdmin from './components/Admin/home.vue';
import PagCliente from './components/Cliente/home.vue';

Vue.use(Router);

const routes = [
  { path: '/', name: 'Login', component: LoginPag },
  { path: '/pag-admin', name: 'Pagina Admin', component: PagAdmin },
  { path: '/pag-cliente', name: 'Pagina cliente', component: PagCliente },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
