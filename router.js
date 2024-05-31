import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import Portfolio from './views/Portfolio.vue';
import StockDetails from "@/views/StockDetails.vue";
import StockList from './views/StockList.vue';
import HomePage from "@/views/HomePage.vue";
import ChangePassword from '@/views/ChangePassword.vue';
import { auth } from './firebase.js';


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/change-password',
        name: 'ChangePassword',
        component: ChangePassword,
        meta: { requiresAuth: true }
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: Portfolio,
        meta: { requiresAuth: true }
    },
    {
        path: '/stock',
        name: 'StockList',
        component: StockList,
        meta: { requiresAuth: true }
    },
    {
        path: '/stock/:symbol',
        name: 'StockDetails',
        component: StockDetails,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation Guard to check for authentication
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser;

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
