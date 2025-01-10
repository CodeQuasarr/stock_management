<script lang="ts" setup>

import AuthTemplate from "../../layouts/AuthTemplate.vue";
import BaseInput from "../../components/common/BaseInput.vue";
import BaseSelect from "../../components/common/BaseSelect.vue";
import {useRoute, useRouter} from "vue-router";
import {useProductForm} from "../../composables/useProductForm.ts";
import {FwbToast} from 'flowbite-vue'

const router = useRouter()
const route = useRoute()
const productId = route.params.id as string | undefined

const {product, errors, success, save} = useProductForm(productId)
</script>

<template>
    <AuthTemplate>
        <div class="space-y-8">
            <div class="flex flex-col md:flex-row lg:items-center md:justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">{{ productId ? 'Modification' : 'Création' }} d'un product</h1>
                    <p class="text-gray-600">Gérez les stocks de manière efficace et organisée</p>
                </div>
            </div>
            <fwb-toast v-if="errors.message?.trim()" closable type="danger">
                <div class="text-red-500" v-html="errors.message"></div>
            </fwb-toast>

            <fwb-toast v-if="productId && success" closable type="success">
                Le stock a été modifié avec succès
            </fwb-toast>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <form v-if="Object.keys(product).length" class="card max-w-2xl" @submit.prevent="save()">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseInput
                            v-model="product.name"
                            :error="errors.name"
                            label="Produit"
                            required
                        />

                        <BaseInput
                            v-if="!productId && product.expiration_date"
                            v-model="product.expiration_date"
                            :error="errors.expiration_date"
                            label="Date d'expiration"
                            required
                            type="date"
                        />
                        <BaseInput
                            v-model="product.unique_code"
                            :error="errors.unique_code"
                            label="code unique"
                            required
                        />

                        <BaseInput
                            v-model="product.manufacturer"
                            :error="errors.manufacturer"
                            label="fabricant"
                            required
                        />
                    </div>


                    <BaseInput
                        v-model="product.description"
                        label="Description"
                        type="textarea"
                    />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaseInput
                            v-if="!productId && product.purchase_price"
                            v-model="product.purchase_price"
                            :error="errors.purchase_price"
                            label="Prix d'achat"
                            required
                            type="number"
                        />
                        <BaseInput
                            v-model="product.sale_price"
                            :error="errors.sale_price"
                            label="Prix de vente"
                            required
                            type="number"
                        />

                        <BaseInput
                            v-model="product.stock_quantity"
                            :error="errors.stock_quantity"
                            label="Quantité en stock"
                            required
                            type="number"
                        />

                        <BaseSelect
                            v-model="product.therapeutic_category"
                            :options="[
                            { value: 'Allergies', label: 'Allergies' },
                            { value: 'Antidouleur', label: 'Antidouleur' },
                            { value: 'Anti-inflammatoire', label: 'Anti-inflammatoire' },
                            { value: 'Anti-inflammatoire', label: 'Anti-inflammatoire' }
                        ]"
                            label="catégorie thérapeutique"
                        />
                    </div>

                    <div class="flex justify-end space-x-4 mt-6">
                        <button
                            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                            type="button"
                            @click="router.push('/products')"
                        >
                            Retour
                        </button>
                        <button
                            class="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                            type="submit"
                        >
                            {{ productId ? 'Modifier' : 'Créer' }} le product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AuthTemplate>
</template>

<style scoped>

</style>
