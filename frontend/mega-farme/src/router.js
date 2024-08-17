import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'; // Corrigido para importar da store correta

Vue.use(VueRouter);

// Importações de views
import HomePage from './views/HomePage.vue';
import ProdutoPage from './views/ProdutoPage.vue';
import LoginPage from './views/LoginPage.vue';
import UsuarioPage from './views/Usuario/HomePage.vue';
import CarrinhoComponente from "./components/CarrinhoComponente.vue"
const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/produto/:id',
        name: "produto",
        component: ProdutoPage,
        props: true,
    },
    {
        path: "/login",
        name: "login", // Corrigido para "name"
        component: LoginPage,
    },
    {
        path: '/usuario',
        component: UsuarioPage,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isUserLoggedIn) {
                if (to.path !== '/login') { // Corrigido o caminho para '/login'
                    next('/login');
                } else {
                    next(); // Permitir que a rota de login seja carregada
                }
            } else {
                next(); // Usuário autenticado, prosseguir para a rota
            }
        },
    },
    {
        path: '/carrinho',
        name: 'Carrinho',
        component: CarrinhoComponente,
        meta: { requiresAuth: true }
      },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
