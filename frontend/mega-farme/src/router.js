import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Importações de views
import HomePage from './views/HomePage.vue';
import ProdutoDescricao from './components/PageCliente/ProdutoDescricao.vue';
// import PagCadastro from './views/PagCadastro.vue';
import PagLogin from './views/PagLogin.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/produto/:id',
        name: "produto",
        component: ProdutoDescricao,
        props: true,
    },
    {
        path: '/login',
        component: PagLogin,
    },
    // {
    //     path: '/cadastro',
    //     component: PagCadastro,
    // },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
