<script setup lang="ts">

import { defineEmits } from "vue";

const emit = defineEmits(["update:modelValue"]);

</script>

<template>
    <header class="bg-white border-b border-gray-200 sticky top-0">
        <div class="mx-auto px-10">
            <div class="flex h-16 items-center justify-between">
                <!-- Mobile Sidebar Toggle -->
                <div class="lg:hidden w-10">
                    <button
                        class=" p-2 bg-indigo-600 text-white rounded-lg"
                        @click="emit('update:modelValue', true)"
                    >
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
<!--                <div class="flex-1 max-w-lg mx-8">-->
<!--                    <div class="relative">-->
<!--                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />-->
<!--                        </svg>-->

<!--                        <input-->
<!--                            type="text"-->
<!--                            placeholder="Recherche"-->
<!--                            class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="flex items-center space-x-4">-->
<!--                    <NotificationsDropdown />-->
<!--                    <UserDropdown />-->
<!--                </div>-->
            </div>
        </div>
    </header>
</template>

<style scoped>

</style>
