import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['vue', 'axios'], // Exemples : placer 'vue' et 'axios' dans un chunk séparé
                },
            },
        },
    },
})
