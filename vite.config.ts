import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8', // Utilisez 'v8' ou 'istanbul'
            reporter: ['text', 'json', 'html'], // Formats de rapport
        },
    },
})
