<script lang="ts" setup>

import {ref, onMounted} from 'vue'
import AuthTemplate from "../../layouts/AuthTemplate.vue";
import {useStocks} from "../../composables/useStocks.ts";
import {TrashIcon, PencilIcon, ExclamationTriangleIcon} from '@heroicons/vue/24/outline'
import {initFlowbite} from "flowbite";
import { FwbButton, FwbModal } from 'flowbite-vue'

const {products, isShowModal, deleteProduct, closeModal, showModal} = useStocks()
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
<!--                <div class="mb-4">-->
<!--                    <input-->
<!--                        v-model="searchQuery"-->
<!--                        class="input"-->
<!--                        placeholder="Search products..."-->
<!--                        type="text"-->
<!--                    />-->
<!--                </div>-->

                <div v-if="products.length" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                                    <td :class="['px-6 py-4 font-bold', product.stock_quantity < 10 ? 'text-red-500' : 'text-green-500']"  >{{ product.stock_quantity }}</td>
                                    <td class="px-6 py-4">{{ product.sale_price }}€</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                        <RouterLink class="px-4 rounded-lg py-2 bg-indigo-50 text-indigo-500 hover:bg-indigo-100" :to="'products/'+product.id">
                                            <component :is="PencilIcon" class="h-5 w-5" />
                                        </RouterLink>
                                        <fwb-button
                                            class="ml-3 font-normal text-red-500 bg-red-50 hover:bg-red-100"
                                            @click="showModal(product.id)"
                                        >
                                            <component :is="TrashIcon" class="h-5 w-5" />
                                        </fwb-button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center text-gray-600 text-lg">
                    <component :is="ExclamationTriangleIcon" class="h-20 w-20 text-orange-500" />
                    <p> Aucun données disponibles pour le moment. </p>
                    <p> veuillez ajouter des stocks pour voir les statistiques en cliquant sur le bouton ci-dessus. </p>
                </div>

                <fwb-modal size="md" v-if="isShowModal" @close="closeModal">
                    <template #body>
                        <p class="text-base leading-relaxed text-red-500 font-bold">
                            Êtes-vous sûr de vouloir supprimer cet élément ?
                        </p>
                    </template>
                    <template #footer>
                        <div class="flex justify-between">
                            <fwb-button @click="closeModal" color="alternative">
                                Non
                            </fwb-button>
                            <fwb-button @click="deleteProduct" color="red">
                                Oui
                            </fwb-button>
                        </div>
                    </template>
                </fwb-modal>

            </div>
        </div>
    </AuthTemplate>
</template>
