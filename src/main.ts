import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import '../node_modules/flowbite-vue/dist/index.css'
import { router } from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app
    .use(router)
    .use(pinia)
    .mount('#app')

