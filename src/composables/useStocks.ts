import { ref, onMounted } from 'vue';
import {useStocksStore} from "../stores/stocksStore.ts";

export function useStocks() {

    const stockStore = useStocksStore();
    const stocksMovement = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const getProductMovements = async (unique_code: string) => {
        loading.value = true;
        try {
            await stockStore.loadProductMovements(unique_code);

            stockMovement.value = stockStore.stock_movements;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        stockMovement,
        loading,
        error,
        getProductMovements
    };
}
