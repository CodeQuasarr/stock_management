<script lang="ts" setup>

import AuthTemplate from "../layouts/AuthTemplate.vue";
import KPICards from "../components/KPICards.vue";
import {useStatistics} from "../composables/useStatistics.ts";


const {statistics, stockSelection, loading, error} = useStatistics()

</script>

<template>
    <AuthTemplate>
        <div class="space-y-8">
            <div class="flex flex-col md:flex-row lg:items-center md:justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p class="text-gray-600">Gérez les stocks de manière efficace et organisée</p>
                </div>

                <div class="mt-4 lg:mt-0 flex items-center space-x-4">
                    <select
                        class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option
                            v-for="stock in stockSelection"
                            :key="'stock_select_' + stock.id"
                            :value="stock.value"
                        >
                            {{ stock.label }}
                        </option>
                    </select>

                    <button
                        class="flex items-center space-x-2 bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
                        <!--                        <Plus class="h-4 w-4" />-->
                        <span>Ajouter un produit</span>
                    </button>
                </div>
            </div>

            <KPICards
                v-if="statistics"
                :data="statistics"
            />
        </div>
    </AuthTemplate>
</template>

<style scoped>

</style>
