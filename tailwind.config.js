/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#FF6363',
                'orange': {
                    600: '#FB923C',
                    100: '#FFA500',
                }
            }
        },
    },
    plugins: [require('flowbite/plugin')],
}
