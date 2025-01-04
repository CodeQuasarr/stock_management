<script lang="ts" setup>
defineProps<{
    title: string
    value: string | number
    icon: any
    trend?: number
}>()
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ title }}</p>
                <p class="text-2xl font-semibold mt-1">{{ value }}</p>
                <p v-if="trend !== undefined"
                   :class="['text-sm mt-2', trend >= 0 ? 'text-green-600' : 'text-red-600']">
                    {{ trend >= 0 ? '+' : '' }}{{ trend }}%
                </p>
            </div>
            <component :is="icon" class="w-12 h-12 text-primary-500"/>
        </div>
    </div>
</template>
