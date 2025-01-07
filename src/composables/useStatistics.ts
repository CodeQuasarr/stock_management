import { ref, onMounted } from 'vue';
import {useStatisticsStore} from "../stores/statisticsStore.ts";
import {useStocksStore} from "../stores/stocksStore.ts";
import type {Kpi, ListProductSelection, StockEvolution, StockMovement} from "../types";

export function useStatistics() {
    const statStore = useStatisticsStore();
    const stockStore = useStocksStore();

    const statistics = ref<Kpi>({});
    const stockSelection = ref<ListProductSelection>([]);
    const stocksMovement = ref<StockMovement>([]);
    const stockEvolution = ref<StockEvolution>([]);
    const loading = ref<boolean>(false);
    const error = ref<any>(null);

    /**
     * Get statistics and stock movement for a specific product
     * @param unique_code
     */
    const otherStatistics = async (unique_code: string) => {
        loading.value = true;
        try {
            await getStatistics(unique_code);
            await getStockMovement(unique_code);
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Get statistics for all products
     * @param unique_code
     */
    const getStatistics = async (unique_code: string = null) => {
        await statStore.loadStatistics(unique_code);
        statistics.value = statStore.kpis;
        stockSelection.value = statStore.stockSelection;
        stockEvolution.value = statStore.stockEvolution;
    }

    /**
     * Get stock movement for a specific product
     * @param unique_code
     */
    const getStockMovement = async (unique_code: string = null) => {
        await stockStore.loadProductMovements(unique_code ?? stockSelection.value[0].value);
        stocksMovement.value = stockStore.stock_movements;
    }

    onMounted(async () => {
        loading.value = true;
        try {
            await getStatistics();
            await getStockMovement();
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    });

    return {
        statistics,
        stockSelection,
        stockEvolution,
        stocksMovement,
        loading,
        error,
        otherStatistics,
    };
}
