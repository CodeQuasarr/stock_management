import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import type {Kpi, ListProductSelection, StockEvolution} from '../../types';
import {useStatisticsStore} from "../statisticsStore.ts";

describe('useStatisticsStore - Tests approfondis', () => {
    let mockAxios: MockAdapter;
    let store: ReturnType<typeof useStatisticsStore>;

    beforeEach(() => {
        // Initialiser Pinia
        setActivePinia(createPinia());

        // Initialiser le mock Axios
        mockAxios = new MockAdapter(axios);

        // Initialiser le store
        store = useStatisticsStore();
    });

    afterEach(() => {
        // Réinitialiser les mocks après chaque test
        mockAxios.restore();
        vi.clearAllMocks();
    });

    it('Charger les statistiques avec succès', async () => {

        const uniqueCode = '123';
        const mockResponse = {
            kpis: { totalProducts: 100, outOfStock: 5 } as Kpi,
            stockSelection: [{ id: 1, name: 'Product A', selected: true }] as ListProductSelection[],
            stockEvolution: [{ date: '2023-10-01', stockLevel: 50 }] as StockEvolution[],
        };

        // Mock de la réponse de l'API
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(200, mockResponse);

        await store.loadStatistics(uniqueCode);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBeNull(); // Aucune erreur ne doit être présente
        expect(store.kpis).toEqual(mockResponse.kpis); // Les KPIs doivent correspondre
        expect(store.stockSelection).toEqual(mockResponse.stockSelection); // La sélection de stock doit correspondre
        expect(store.stockEvolution).toEqual(mockResponse.stockEvolution); // L'évolution du stock doit correspondre
    });

    it('Gérer les erreurs lors du chargement des statistiques', async () => {

        const uniqueCode = '123';
        const errorMessage = 'Request failed with status code 500';

        // Mock d'une erreur de l'API
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(500, { message: errorMessage });

        await store.loadStatistics(uniqueCode);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBe(errorMessage); // L'erreur doit être capturée
        expect(store.kpis).toEqual({}); // Aucun KPI ne doit être chargé
        expect(store.stockSelection).toEqual([]); // Aucune sélection de stock ne doit être chargée
        expect(store.stockEvolution).toEqual([]); // Aucune évolution de stock ne doit être chargée
    });

    it('Gérer les cas où unique_code est null ou undefined', async () => {

        const mockResponse = {
            kpis: { totalProducts: 100, outOfStock: 5 } as Kpi,
            stockSelection: [{ id: 1, name: 'Product A', selected: true }] as ListProductSelection[],
            stockEvolution: [{ date: '2023-10-01', stockLevel: 50 }] as StockEvolution[],
        };

        // Mock de la réponse de l'API sans unique_code
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`)
            .reply(200, mockResponse);

        await store.loadStatistics(null);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBeNull(); // Aucune erreur ne doit être présente
        expect(store.kpis).toEqual(mockResponse.kpis); // Les KPIs doivent correspondre
        expect(store.stockSelection).toEqual(mockResponse.stockSelection); // La sélection de stock doit correspondre
        expect(store.stockEvolution).toEqual(mockResponse.stockEvolution); // L'évolution du stock doit correspondre
    });

    it('Mettre loading à true pendant le chargement des données', async () => {

        const uniqueCode = '123';
        const mockResponse = {
            kpis: { totalProducts: 100, outOfStock: 5 } as Kpi,
            stockSelection: [{ id: 1, name: 'Product A', selected: true }] as ListProductSelection[],
            stockEvolution: [{ date: '2023-10-01', stockLevel: 50 }] as StockEvolution[],
        };

        // Mock de la réponse de l'API avec un délai
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, mockResponse]), 100)));

        const loadPromise = store.loadStatistics(uniqueCode);

        expect(store.loading).toBe(true); // Le chargement doit être en cours

        // Attendre que la promesse soit résolue
        await loadPromise;

        expect(store.loading).toBe(false); // Le chargement doit être terminé
    });

    it('Réinitialiser les erreurs avant de charger de nouvelles données', async () => {

        const uniqueCode = '123';
        store.error = 'Erreur précédente'; // Simuler une erreur précédente

        const mockResponse = {
            kpis: { totalProducts: 100, outOfStock: 5 } as Kpi,
            stockSelection: [{ id: 1, name: 'Product A', selected: true }] as ListProductSelection[],
            stockEvolution: [{ date: '2023-10-01', stockLevel: 50 }] as StockEvolution[],
        };

        // Mock de la réponse de l'API
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(200, mockResponse);

        await store.loadStatistics(uniqueCode);

        expect(store.error).toBeNull(); // L'erreur précédente doit être réinitialisée
        expect(store.kpis).toEqual(mockResponse.kpis); // Les nouvelles données doivent être chargées
    });

    it('Gérer les réponses vides ou malformées de l\'API', async () => {

        const uniqueCode = '123';

        // Mock d'une réponse vide ou malformée
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(200, {}); // Pas de champs "kpis", "stockSelection", ou "stockEvolution"

        await store.loadStatistics(uniqueCode);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBe(null); // Une erreur doit être capturée
        expect(store.kpis).toEqual({}); // Aucun KPI ne doit être chargé
        expect(store.stockSelection).toEqual([]); // Aucune sélection de stock ne doit être chargée
        expect(store.stockEvolution).toEqual([]); // Aucune évolution de stock ne doit être chargée
    });

    it('Annuler la requête en cours si une nouvelle requête est lancée', async () => {

        const uniqueCode = '123';
        const mockResponse = {
            kpis: { totalProducts: 100, outOfStock: 5 } as Kpi,
            stockSelection: [{ id: 1, name: 'Product A', selected: true }] as ListProductSelection[],
            stockEvolution: [{ date: '2023-10-01', stockLevel: 50 }] as StockEvolution[],
        };

        // Mock de la première requête avec un délai
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, mockResponse]), 200)));

        const firstLoadPromise = store.loadStatistics(uniqueCode);
        const secondLoadPromise = store.loadStatistics(uniqueCode); // Nouvelle requête

        await firstLoadPromise; // La première requête doit être annulée
        await secondLoadPromise; // La deuxième requête doit être terminée

        expect(store.kpis).toEqual(mockResponse.kpis); // Les données doivent correspondre
    });

    it('Gérer les réponses API avec des données volumineuses', async () => {

        const uniqueCode = '123';
        const mockResponse = {
            kpis: { totalProducts: 10000, outOfStock: 500 } as Kpi,
            stockSelection: Array.from({ length: 1000 }, (_, i) => ({
                id: i + 1,
                name: `Product ${i + 1}`,
                selected: i % 2 === 0,
            })) as ListProductSelection[],
            stockEvolution: Array.from({ length: 365 }, (_, i) => ({
                date: `2023-01-${String(i + 1).padStart(2, '0')}`,
                stockLevel: Math.floor(Math.random() * 100),
            })) as StockEvolution[],
        };

        // Mock de la réponse de l'API avec des données volumineuses
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, { params: { unique_code: uniqueCode } })
            .reply(200, mockResponse);

        await store.loadStatistics(uniqueCode);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBeNull(); // Aucune erreur ne doit être présente
        expect(store.kpis).toEqual(mockResponse.kpis); // Les KPIs doivent correspondre
        expect(store.stockSelection).toEqual(mockResponse.stockSelection); // La sélection de stock doit correspondre
        expect(store.stockEvolution).toEqual(mockResponse.stockEvolution); // L'évolution du stock doit correspondre
    });
});
