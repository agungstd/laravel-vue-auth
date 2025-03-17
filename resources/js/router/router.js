import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import NotFound from '../components/NotFound' // You'll need to create this component

const routes = [
    {
        path: '/',
        redirect: { name: 'dashboard' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { guest: true } 
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedOut = localStorage.getItem('token') === null;
    
    // Handle routes that require guest access (like login)
    if (to.matched.some(record => record.meta.guest)) {
        if (!isLoggedOut) {
            // User is logged in, redirect to dashboard
            next({ name: 'dashboard' });
        } else {
            // User is a guest, allow access
            next();
        }
    } 
    // Handle routes that require authentication
    else if (to.matched.some(record => record.meta.requiresAuth)) { 
        if (isLoggedOut) {
            // User is not logged in, redirect to login
            next({ 
                name: 'login',
                query: { redirect: to.fullPath } // Store the path they were trying to access
            });
        } else {
            // User is authenticated, allow access
            next();
        } 
    } else {
        // Route with no meta requirements
        next();
    }
})

export default router;