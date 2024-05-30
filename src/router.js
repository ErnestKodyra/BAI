import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import Portfolio from './views/Portfolio.vue';
import Exchange from './views/Exchange.vue';
import StockDetails from "@/views/StockDetails.vue";
import StockList from './views/StockList.vue';
import { auth } from './firebase.js';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: StockList,
        meta: { requiresAuth: true } // Assuming the home page should be protected
    },
    {
        path: '/login',
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
        path: '/exchange',
        name: 'Exchange',
        component: Exchange,
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
