import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import Portfolio from './views/Portfolio.vue'
import Exchange from './views/Exchange.vue'
import Stock from "@/views/Stock.vue";

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
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: Portfolio
    },
    {
        path: '/exchange',
        name: 'Exchange',
        component: Exchange
    },
    {
        path: '/stock/:symbol',
        name: 'Stock',
        component: Stock
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router