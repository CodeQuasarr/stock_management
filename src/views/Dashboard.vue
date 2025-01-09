<script lang="ts" setup>

import {ref} from "vue";
import AuthTemplate from "../layouts/AuthTemplate.vue";
import KPICards from "../components/KPICards.vue";
import {useStatistics} from "../composables/useStatistics.ts";
import {Line as LineChart} from 'vue-chartjs'
import {defaultChartOptions} from "../utils/chartConfig.ts";
import {compareDates, expiredDate} from "../utils/DateManagement.ts";


const {
    statistics,
    stockSelection,
    stockEvolution,
    stocksMovement,
    otherStatistics,
} = useStatistics()

const productSelected = ref('all')


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
                        v-model="productSelected"
                        class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        @change="otherStatistics(productSelected)"
                    >
                        <option
                            v-for="stock in stockSelection"
                            :key="'stock_select_' + stock.value"
                            :value="stock.value"
                        >
                            {{ stock.label }}
                        </option>
                    </select>

                    <RouterLink
                        to="/products/new"
                        class="flex items-center space-x-2 bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
                        <!--                        <Plus class="h-4 w-4" />-->
                        <span>Ajouter un Stock</span>
                    </RouterLink>
                </div>
            </div>

            <KPICards
                v-if="statistics"
                :data="statistics"
            />
            <!-- Charts Grid -->
            <div class="grid grid-cols-1 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 class="text-lg font-semibold mb-4">Évolution des stocks</h2>
                    <div class="h-[300px]">
                        <LineChart
                            v-if="Object.keys(stockEvolution).length"
                            :data="stockEvolution"
                            :options="defaultChartOptions"
                        />
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100">
                        <h2 class="text-lg font-semibold">Mouvement du stock</h2>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Produit
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(stock_movement, index) in stocksMovement" :key="'stock_movement_' + stock_movement.product.unique_code + '_index_' + index">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ stock_movement.product.name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ stock_movement.product.unique_code }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ stock_movement.reason }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="compareDates(new Date(stock_movement.expiration_date), new Date()) ? 'text-red-500' : 'text-green-500'">
                                        {{ expiredDate(stock_movement.expiration_date) }}
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AuthTemplate>
</template>

<style scoped>

</style>
