import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import Portfolio from './views/Portfolio.vue'
import Exchange from './views/Exchange.vue'
import StockDetails from "@/views/StockDetails.vue";
import StockList from './views/StockList.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/profile/',
        name: 'Profile',
        component: Profile,
        // meta: { requiresAuth: true }
    },
    {
        path: '/portfolio/:id',
        name: 'Portfolio',
        component: Portfolio,
        // meta: { requiresAuth: true }
    },
    {
        path: '/exchange',
        name: 'Exchange',
        component: Exchange
    },
    {
        path: '/stock',
        name: 'StockList',
        component: StockList
    },
    {
        path: '/stock/:symbol',
        name: 'StockDetails',
        component: StockDetails
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router