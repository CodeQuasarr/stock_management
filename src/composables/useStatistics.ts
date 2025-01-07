import { ref, onMounted } from 'vue';

import {useStatisticsStore} from "../stores/statisticsStore.ts";
import {useStocksStore} from "../stores/stocksStore.ts";
import type {Kpi, ListProductSelection, StockMovement} from "../types";

export function useStatistics() {
    const statStore = useStatisticsStore();
    const stockStore = useStocksStore();

    const statistics = ref<Kpi | null>(null);
    const stockSelection = ref<ListProductSelection[]>([]);
    const stocksMovement = ref<StockMovement[]>([]);
    const stockEvolution = ref<any>([]);
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
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Get statistics for all products
     * @param unique_code
     */
    const getStatistics = async (unique_code: string|null = null) => {
        await statStore.loadStatistics(unique_code);
        statistics.value = statStore.kpis;
        stockSelection.value = statStore.stockSelection;
        stockEvolution.value = statStore.stockEvolution;
    }

    /**
     * Get stock movement for a specific product
     * @param unique_code
     */
    const getStockMovement = async (unique_code: string|null = null) => {
        await stockStore.loadProductMovements(unique_code ?? stockSelection.value[0].value);
        stocksMovement.value = stockStore.stock_movements;
    }

    onMounted(async () => {
        loading.value = true;
        try {
            await getStatistics();
            await getStockMovement();
        } catch (err: any) {
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
