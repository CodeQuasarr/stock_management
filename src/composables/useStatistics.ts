import { ref, onMounted } from 'vue';
import {usestatisticsStore} from "../stores/statisticsStore.ts";

export function useStatistics() {
    const store = usestatisticsStore()


    const statistics = ref({});
    const stockSelection = ref([]);
    const stockEvolution = ref([]);
    const loading = ref(false);
    const error = ref(null);

    onMounted(async () => {
        loading.value = true;
        try {
            await store.loadStatistics();
            statistics.value = store.kpis;
            stockSelection.value = store.stockSelection;
            stockEvolution.value = store.stockEvolution;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    });

    return { statistics, stockSelection, stockEvolution, loading, error };
}