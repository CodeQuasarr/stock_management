<script lang="ts" setup>

import {ref, onMounted} from 'vue'
import AuthTemplate from "../../layouts/AuthTemplate.vue";
import {useStocks} from "../../composables/useStocks.ts";
import {initFlowbite} from "flowbite";
import { FwbButton, FwbModal } from 'flowbite-vue'

const {products, isShowModal, currentId, deleteProduct, closeModal, showModal} = useStocks()
const searchQuery = ref('')

onMounted(() => {
    initFlowbite()
})
</script>

<template>
    <AuthTemplate>
        <div class="space-y-8">
            <div class="flex flex-col md:flex-row lg:items-center md:justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Produis</h1>
                    <p class="text-gray-600">Gérez les stocks des produits</p>
                </div>

                <div class="mt-4 lg:mt-0 flex items-center space-x-4">
                    <RouterLink
                        to="/products/new"
                        class="flex items-center space-x-2 bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
                        <!--                        <Plus class="h-4 w-4" />-->
                        <span>Ajouter un Stock</span>
                    </RouterLink>
                </div>
            </div>


            <div class="card">
                <div class="mb-4">
                    <input
                        v-model="searchQuery"
                        class="input"
                        placeholder="Search products..."
                        type="text"
                    />
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 class="text-lg font-semibold mb-4">Liste des produits</h2>
                    <div class="">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Code
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantité
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Prix
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="product in products" :key="product.id">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div>
                                                <div class="font-medium">{{ product.name }}</div>
                                                <div class="text-sm text-gray-500">{{ product.description }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">{{ product.unique_code }}</td>
                                    <td class="px-6 py-4">{{ product.stock_quantity }}</td>
                                    <td class="px-6 py-4">{{ product.sale_price }}€</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <RouterLink class="text-indigo-500 hover:text-indigo-500/80" :to="'products/'+product.id">Editer</RouterLink>
                                        <fwb-button
                                            :class="'ml-3 font-normal text-red-500 bg-white hover:bg-white hover:text-red-500/80'"
                                            @click="showModal(product.id)"
                                        >
                                            Supprimer
                                        </fwb-button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <fwb-modal size="md" v-if="isShowModal" @close="closeModal">
                    <template #body>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Êtes-vous sûr de vouloir supprimer cet élément ? {{ currentId}}
                        </p>
                    </template>
                    <template #footer>
                        <div class="flex justify-between">
                            <fwb-button @click="closeModal" color="alternative">
                                Non
                            </fwb-button>
                            <fwb-button @click="deleteProduct" color="blue">
                                Oui
                            </fwb-button>
                        </div>
                    </template>
                </fwb-modal>

            </div>
        </div>
    </AuthTemplate>
</template>
