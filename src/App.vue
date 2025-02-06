<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

const route = useRoute()

useHead({
    title: () => route.meta.title as string || 'MediBook',
    meta: [
        {
            name: 'description',
            content: () => route.meta.description as string || 'PharmaFlow - Plateforme de gestion de stock des produits pharmaceutiques en ligne'
        },
        { name: 'keywords', content: 'stock, pharmacie, médicament, gestion, produits pharmaceutiques' },
        { name: 'author', content: 'PharmaFlow' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: () => route.meta.title as string || 'PharmaFlow' },
        { property: 'og:description', content: () => route.meta.description as string },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: () => route.meta.title as string || 'PharmaFlow' },
        { name: 'twitter:description', content: () => route.meta.description as string }
    ],
    link: [
        { rel: 'canonical', href: 'https://doc-on-time.codequasarr.fr' }
    ]
})

</script>

<template>
    <div>
        <RouterView />
    </div>
</template>

<style scoped>

</style>
