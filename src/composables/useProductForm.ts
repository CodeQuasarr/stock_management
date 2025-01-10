import {onMounted, ref} from 'vue'
import type {Product} from '../types'
import {useStocksStore} from "../stores/stocksStore.ts";
import {useRouter} from "vue-router";

export function useProductForm(productId?: string) {
    const stockStore = useStocksStore()
    const errors = ref<Record<string, string>>({})
    const success = ref<string|null>(null)

    const router = useRouter()
    const loading = ref<boolean>(false);
    const product = ref<Product>({
        name: 'Loratadine 10 mg',
        unique_code: 'LRDC10',
        description: 'Allergie et rhume des foins',
        purchase_price: 0.80,
        sale_price: 1.50,
        stock_quantity: 250,
        expiration_date: '2025-10-01',
        therapeutic_category: 'Allergies',
        manufacturer: 'BioPharm'
    })

    const getProduct = async () => {
        loading.value = true;
        try {
            if (!productId) return;
            await stockStore.loadProduct(parseInt(productId, 10));
            product.value = stockStore.product;
            if (Object.keys(product.value).length === 0) {
                await router.push({name: 'Error404'});
            }
        } catch (err: any) {
            errors.value.message = err.message;
        } finally {
            loading.value = false;
        }
    }

    const validate = () => {
        errors.value = {}
        if (!product.value.name) errors.value.name = 'Le nom du produit est requis'
        if (!product.value.unique_code) errors.value.sku = 'Le code unique est requis'
        if (!product.value.manufacturer) errors.value.supplierId = 'Le fabricant est requis'
        if (product.value.purchase_price! < 0) errors.value.price = 'Le prix doit être positif'
        if (product.value.stock_quantity! < 0) errors.value.quantity = 'La quantité doit être positive'
        if (!product.value.therapeutic_category) errors.value.therapeutic_category = 'La catégorie thérapeutique est requise'
        if (product.value.expiration_date && !product.value.expiration_date.trim()) errors.value.expiration_date = 'La date d\'expiration est requise'

        return Object.keys(errors.value).length === 0
    }

    const save = async () => {
        if (!validate()) return false

        try {
            if (productId) {
                await stockStore.updateProduct(parseInt(productId, 10), product.value)
                if (stockStore.success) {
                    success.value = stockStore.success
                }
                errors.value.message = stockStore.error ?? ''
            } else {
                await stockStore.addProduct(product.value as Product)
                if (stockStore.product_id) {
                    window.location.href = `/products/${stockStore.product_id}`
                }
                errors.value.message = stockStore.error ?? ''
            }
            return true
        } catch (err: any) {
            console.error('error', stockStore.error);
        } finally {
            loading.value = false;
        }

    }

    onMounted(async () => {
        if (productId) await getProduct();
    })

    return {
        product,
        errors,
        success,
        save
    }
}
