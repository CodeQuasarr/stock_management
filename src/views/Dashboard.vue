<script lang="ts" setup>

import AuthTemplate from "../layouts/AuthTemplate.vue";
import KPICards from "../components/KPICards.vue";
import {useStatistics} from "../composables/useStatistics.ts";
import {Doughnut as DoughnutChart, Line as LineChart} from 'vue-chartjs'
import {defaultChartOptions} from "../utils/chartConfig.ts";


const {statistics, stockSelection, stockEvolution, loading, error} = useStatistics()

const doughnutChartData = {
    labels: ['Electronics', 'Clothing', 'Food', 'Others'],
    datasets: [{
        data: [30, 25, 15, 30],
        backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#6B7280']
    }]
}

</script>

<template>
    <AuthTemplate>
        <div class="space-y-8">
            <pre>{{stockEvolution}}</pre>
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
        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-lg font-semibold mb-4">Articles invendus par catégorie</h2>
                <div class="h-[300px]">
                    <DoughnutChart
                        :data="doughnutChartData"
                        :options="defaultChartOptions"
                    />
                </div>
            </div>
        </div>
    </AuthTemplate>
</template>

<style scoped>

</style>
