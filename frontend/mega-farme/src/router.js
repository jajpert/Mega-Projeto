import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

// Importações de views
import HomePage from './views/HomePage.vue';
import ProdutoDescricao from './components/PageCliente/ProdutoDescricao.vue';
import PagComprar from './views/PagComprar.vue'; // Corrigido
import PagCadastro from './views/PagCadastro.vue';
import PagLogin from './views/PagLogin.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: false },
        props: true,
    },
    {
        path: '/produto/:id',
        name: "produto",
        component: ProdutoDescricao,
    },
    {
        path: '/comprar',
        component: PagComprar,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        component: PagLogin,
    },
    {
        path: '/cadastro',
        component: PagCadastro,
    },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
