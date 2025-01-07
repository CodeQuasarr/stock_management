import {defineStore} from 'pinia';
import {fetchStockMovement} from "../Services/stocks/StockService.ts";
import type {StockMovement} from "../types";

export const useStocksStore = defineStore('stocks', {
    state: () => ({
        stock_movements: [] as StockMovement[],
        loading: false as boolean,
        error: null as string|null,
    }),
    actions: {
        async loadProductMovements(unique_code: string|null = null) {
            this.$state.loading = true;
            this.$state.error = null;
            try {
                const response = await fetchStockMovement(unique_code);
                this.$state.stock_movements = response.data.stock_movements ?? [];
            } catch (error: any) {
                this.$state.error = error.message;
            } finally {
                this.$state.loading = false;
            }
        },
    },
});
