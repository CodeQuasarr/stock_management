import {onMounted, ref} from 'vue';
import {useStocksStore} from "../stores/stocksStore.ts";
import type {Product, StockMovement} from "../types";

export function useStocks() {

    const stockStore = useStocksStore();
    const products = ref<Product[]>([]);
    const stockMovements = ref<StockMovement[]>([]);
    const loading = ref(false);
    const error = ref(null);
    const isShowModal = ref(false)
    const currentId = ref<number>(0)

    const closeModal = () => {
        isShowModal.value = false
    }

    const showModal = (product_id: number|null = null) => {
        isShowModal.value = true
        currentId.value = product_id || 0
    }

    const deleteProduct = async () => {
        loading.value = true;
        try {
            if (!currentId.value) return;
            await stockStore.deleteProduct(currentId.value);
            await getProducts();
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
            isShowModal.value = false
        }
    }

    const getProductMovements = async (unique_code: string) => {
        loading.value = true;
        try {
            await stockStore.loadProductMovements(unique_code);

            stockMovements.value = stockStore.stock_movements;
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    const getProducts = async () => {
        loading.value = true;
        try {
            await stockStore.loadProducts();
            products.value = stockStore.products;
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    onMounted(async () => {
        await getProducts();
    });

    return {
        stockMovements,
        isShowModal,
        products,
        currentId,
        loading,
        error,
        getProductMovements,
        closeModal,
        showModal,
        deleteProduct
    };
}
