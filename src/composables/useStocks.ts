import { ref } from 'vue';
import {useStocksStore} from "../stores/stocksStore.ts";
import type {StockMovement} from "../types";

export function useStocks() {

    const stockStore = useStocksStore();
    const stockMovements = ref<StockMovement[]>([]);
    const loading = ref(false);
    const error = ref(null);

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

    return {
        stockMovements,
        loading,
        error,
        getProductMovements
    };
}
