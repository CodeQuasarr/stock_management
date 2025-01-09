import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProductList from "../views/stocks/ProductList.vue";
import ProductForm from "../views/stocks/ProductForm.vue";
import Error404 from "../Error404.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Dashboard },
        { path: '/products', component: ProductList },
        { path: '/products/new', component: ProductForm },
        { path: '/products/:id', component: ProductForm, props: true },
        { path: "/:pathMatch(.*)*", name: "Error404", component: Error404 },
    ]
});
