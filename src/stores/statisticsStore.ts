import {defineStore} from 'pinia';
import {fetchStatistics} from "../services/stocks/stockStatisticsService.ts";

export const usestatisticsStore = defineStore('statistics', {
    state: () => ({
        kpis: {},
        stockSelection: [],
        stockEvolution: [],
        loading: false,
        error: null,
    }),
    actions: {
        async loadStatistics() {
            this.$state.loading = true;
            this.$state.error = null;
            try {
                const response = await fetchStatistics();
                this.$state.kpis = response.data.kpis;
                this.$state.stockSelection = response.data.stockSelection;
                this.$state.stockEvolution = response.data.stockEvolution;
            } catch (error) {
                this.$state.error = error.message;
            } finally {
                this.$state.loading = false;
            }
        },
    },
});
