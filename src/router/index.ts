import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Dashboard },
        { path: '/products', component: () => import('../views/stocks/ProductList.vue') },
        { path: '/products/new', component: () => import('../views/stocks/ProductForm.vue') },
        { path: '/products/:id', component: () => import('../views/stocks/ProductForm.vue'), props: true },
        { path: "/:pathMatch(.*)*", name: "Error404", component: () => import('../Error404.vue')  },
    ]
});
