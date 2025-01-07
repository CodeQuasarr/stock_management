<script lang="ts" setup>
import {defineEmits, computed} from "vue";
import {useRoute} from "vue-router";

const props = defineProps<{
    isOpen: Boolean;
}>();
const emit = defineEmits(['update:isOpen']);
const menuItems = [
    { to: '/', icon: 'material-symbols:dashboard-outline', text: 'Dashboard' },
]

const sidebarClasses = computed(() => `
  fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
  ${props.isOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0
`);

const route = useRoute()
</script>

<template>
    <div class="z-50">
        <!-- Overlay -->
        <div
            v-if="isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            @click="emit('update:isOpen', false)"
        />
        <!-- Sidebar -->
        <div :class="sidebarClasses">
            <div class="p-6">
                <div class="flex items-center space-x-3 mb-8">
<!--                    <UIcon name="tabler:play-basketball" class="h-8 w-8 text-indigo-600" />-->
                    <h1 class="text-2xl font-bold text-gray-800">PharmaFlow</h1>
                    <button
                        class="lg:hidden p-2 bg-indigo-600 text-white rounded-lg"
                        @click="emit('update:isOpen', false)"
                    >
<!--                        <UIcon name="material-symbols-light:close-rounded" class="h-6 w-6" />-->
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                <nav class="space-y-2">
                    <RouterLink
                        v-for="item in menuItems"
                        :key="item.to"
                        :to="item.to"
                        class="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors"
                        :class="[
                              route.path === item.to
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                        ]"
                        @click="emit('update:isOpen', false)"
                    >
<!--                        <UIcon :name="item.icon" />-->
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>

                        <component :is="item.icon" class="h-5 w-5" />
                        <span class="font-medium">{{ item.text }}</span>
                    </RouterLink>
                </nav>
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="space-y-2">
                    <RouterLink
                        to="/"
                        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
                        @click="emit('update:isOpen', false)"
                    >
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span class="font-medium">Paramettre</span>
                    </RouterLink>
                    <button
                        class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                    >
<!--                        <UIcon name="bytesize:sign-out" class="h-5 w-5" />-->
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>

                        <span class="font-medium">Déconnexion</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
