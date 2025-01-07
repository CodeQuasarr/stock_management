import {defineStore} from 'pinia';
import {fetchStatistics} from "../services/stocks/stockStatisticsService.ts";
import type {Kpi, ListProductSelection, StockEvolution} from "../types";

export const useStatisticsStore = defineStore('statistics', {
    state: () => ({
        kpis: {} as Kpi,
        stockSelection: [] as ListProductSelection[],
        stockEvolution: [] as StockEvolution[],
        loading: false as boolean,
        error: null as any,
    }),
    actions: {
        /**
         * Load statistics data from the API
         * @param unique_code
         */
        async loadStatistics(unique_code: string = null) {
            this.$state.loading = true;
            this.$state.error = null;
            try {
                const response = await fetchStatistics(unique_code)
                this.$state.kpis = response.data.kpis ?? {} as Kpi;
                this.$state.stockSelection = response.data.stockSelection ?? [] as ListProductSelection[];
                this.$state.stockEvolution = response.data.stockEvolution ?? [] as StockEvolution[];
            } catch (error) {
                this.$state.error = error.message;
            } finally {
                this.$state.loading = false;
            }
        },
    },
});
