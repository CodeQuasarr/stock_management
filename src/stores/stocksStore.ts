import {defineStore} from 'pinia';
import {fetchStockMovement} from "../Services/stocks/StockService.ts";
import type {StockMovement} from "../types";

export const useStocksStore = defineStore('stocks', {
    state: () => ({
        stock_movements: [] as StockMovement[],
        loading: false as boolean,
        error: null,
    }),
    actions: {
        async loadProductMovements(productId = null) {
            this.$state.loading = true;
            this.$state.error = null;
            try {
                const response = await fetchStockMovement(productId);
                this.$state.stock_movements = response.data.stock_movements;
            } catch (error) {
                this.$state.error = error.message;
            } finally {
                this.$state.loading = false;
            }
        },
    },
});
