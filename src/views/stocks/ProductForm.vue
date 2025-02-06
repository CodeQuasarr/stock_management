<script lang="ts" setup>

import AuthTemplate from "../../layouts/AuthTemplate.vue";
import BaseInput from "../../components/common/BaseInput.vue";
import BaseSelect from "../../components/common/BaseSelect.vue";
import {useRoute, useRouter} from "vue-router";
import {useProductForm} from "../../composables/useProductForm.ts";
import {FwbToast} from 'flowbite-vue'
import {useHead} from "@vueuse/head";
export type ToastType = 'success' | 'warning' | 'danger' | 'empty'

useHead({
    title: `Produits | Gestion des stocks | PharmaFlow`,
    meta: [
        {
            name: 'description',
            content: 'Gérez les stocks de manière efficace et organisée'
        },
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})

// Constants (Extracted repeating data)
const CATEGORY_OPTIONS = [
    { value: "Allergies", label: "Allergies" },
    { value: "Antidouleur", label: "Antidouleur" },
    { value: "Anti-inflammatoire", label: "Anti-inflammatoire" },
];
const MOVEMENT_TYPE_OPTIONS = [
    { value: "in", label: "Entrée" },
    { value: "out", label: "Sortie" },
];

const router = useRouter()
const route = useRoute()

const productId = route.params.id as string | undefined
const isDisabled = !!productId;

const {product, productField, errors, success, save} = useProductForm(parseInt(productId  as string, 10))

// Methods (Extraction of Toast messages)
const getToastMessage = () => {
    if (errors.value.message?.trim()) return { type: "danger"  as ToastType, message: errors.value.message };
    if (productId && success) return { type: "success"  as ToastType, message: "Le stock a été modifié avec succès" };
    return null;
};
</script>

<template>
    <AuthTemplate>
        <div class="space-y-8">
            <div class="flex flex-col md:flex-row lg:items-center md:justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">{{ productId ? 'Modifier le' : 'Créer un' }} produit</h1>
                    <p class="text-gray-600">Gérez les stocks de manière efficace et organisée</p>
                </div>
            </div>

            <fwb-toast
                v-if="getToastMessage()"
                closable
                :type="getToastMessage()?.type"
            >
                {{ getToastMessage()?.message }}
            </fwb-toast>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <form v-if="Object.keys(product).length" :class="['card w-full grid grid-cols-1 gap-12', productId ? 'md:grid-cols-2': '']" @submit.prevent="save()">
                    <div class="max-w-full p-12 bg-gray-50 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BaseInput
                                v-model="product.name"
                                :error="errors.name"
                                label="Produit"
                                required
                                :disabled="isDisabled"
                            />

                            <BaseInput
                                v-if="!productId"
                                v-model="product.expiration_date as string"
                                :error="errors.expiration_date"
                                label="Date d'expiration"
                                required
                                type="date"
                                :disabled="isDisabled"
                            />
                            <BaseInput
                                v-model="product.unique_code"
                                :error="errors.unique_code"
                                label="code unique"
                                required
                                :disabled="isDisabled"
                            />

                            <BaseInput
                                v-model="product.manufacturer"
                                :error="errors.manufacturer"
                                label="fabricant"
                                required
                                :disabled="isDisabled"
                            />
                        </div>
                        <BaseInput
                            v-model="product.description"
                            label="Description"
                            type="textarea"
                            :disabled="isDisabled"
                        />
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BaseInput
                                v-if="!productId"
                                v-model="product.purchase_price as number"
                                :error="errors.purchase_price"
                                label="Prix d'achat"
                                required
                                type="number"
                                :disabled="isDisabled"
                            />
                            <BaseInput
                                v-model="product.sale_price"
                                :error="errors.sale_price"
                                label="Prix de vente"
                                required
                                type="number"
                                :disabled="isDisabled"
                            />

                            <BaseInput
                                v-model="product.stock_quantity"
                                :error="errors.stock_quantity"
                                label="Quantité en stock"
                                required
                                type="number"
                                :disabled="isDisabled"
                            />

                            <BaseSelect
                                v-model="product.therapeutic_category"
                                :options="CATEGORY_OPTIONS"
                                label="catégorie thérapeutique"
                                :disabled="isDisabled"
                            />
                        </div>

                    </div>
                    <div v-if="productId" class="p-12 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BaseSelect
                                v-model="productField.movement_type as string"
                                :options="MOVEMENT_TYPE_OPTIONS"
                                :error="errors.movement_type"
                                label="Type de mouvement"
                                required
                                :disabled="false"
                            />
                            <BaseInput
                                v-model="productField.movement_reason as string"
                                :error="errors.movement_reason"
                                label="Raison du mouvement"
                                required
                                :disabled="false"
                            />
                            <BaseInput
                                v-model="productField.movement_quantity as number"
                                :error="errors.movement_quantity"
                                label="Quantité en stock"
                                required
                                type="number"
                                :disabled="false"
                            />
                            <BaseInput
                                v-if="productField.movement_type === 'in'"
                                v-model="productField.expiration_date as string"
                                :error="errors.expiration_date"
                                label="Date d'expiration"
                                required
                                :disabled="false"
                                type="date"
                            />
                        </div>

                    </div>
                    <div class="p-12 col-span-full flex justify-end space-x-4 mt-6">
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
                            Enrégistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AuthTemplate>
</template>

<style scoped>

</style>
