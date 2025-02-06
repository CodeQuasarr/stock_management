import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import '../node_modules/flowbite-vue/dist/index.css'
import { router } from './router'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
const head = createHead();
pinia.use(piniaPluginPersistedstate);
app
    .use(router)
    .use(pinia)
    .use(head)
    .mount('#app')

