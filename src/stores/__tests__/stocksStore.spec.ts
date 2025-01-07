import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {useStocksStore} from "../stocksStore.ts";
import type {StockMovement} from "../../types";

describe('useStocksStore', () => {
    let mockAxios: MockAdapter;
    let store: ReturnType<typeof useStocksStore>;

    // Crée une nouvelle instance de Pinia et l'active
    beforeEach(() => {
        setActivePinia(createPinia());

        // Initialise le mock pour axios
        mockAxios = new MockAdapter(axios);

        // Initialiser le store
        store = useStocksStore();
    });

    // Réinitialiser les mocks après chaque test
    afterEach(() => {
        mockAxios.restore();
        vi.clearAllMocks();
    });

    it('devrait charger les mouvements de produits avec succès', async () => {

        const uniqueCode = '123';
        const mockStockMovements: StockMovement[] = [
            {
                product : {
                    id: '1',
                    name: '123',
                    unique_code: '123'
                },
                type: 'in',
                reason: 'Stock entrepôt',
                expiration_date: '2023-10-01',
                quantity: 10
            },
            {
                product : {
                    id: '2',
                    name: '123',
                    unique_code: '123'
                },
                type: 'out',
                reason: 'Vente',
                expiration_date: '2023-10-02',
                quantity: 5
            }
        ];
        // Mock de la réponse de l'API
        mockAxios.onGet(`${import.meta.env.VITE_API_URL}/stocks/${uniqueCode}/mouvements`).reply(200, {
            stock_movements: mockStockMovements,
        });

        await store.loadProductMovements(uniqueCode);

        expect(store.loading).toBe(false);
        expect(store.error).toBeNull();
        expect(store.stock_movements).toEqual(mockStockMovements);
    });

    it('Devrait gérer les cas où uniqueCode est null ou undefined', async () => {
        const mockStockMovements: StockMovement[] = [
            {
                product : {
                    id: '1',
                    name: '123',
                    unique_code: '123'
                },
                type: 'in',
                reason: 'Stock entrepôt',
                expiration_date: '2023-10-01',
                quantity: 10
            },
        ];

        // Mock de la réponse de l'API pour un uniqueCode null
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/null/mouvements`)
            .reply(200, { stock_movements: mockStockMovements });

        await store.loadProductMovements(null);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBeNull(); // Aucune erreur ne doit être présente
        expect(store.stock_movements).toEqual(mockStockMovements); // Les données doivent correspondre
    });

    it('doit gérer les erreurs lors du chargement des mouvements de produits', async () => {

        const uniqueCode = '123';
        const errorMessage = 'Request failed with status code 500';

        // Mock de la réponse de l'API avec une erreur 500
        mockAxios.onGet(`${import.meta.env.VITE_API_URL}/stocks/${uniqueCode}/mouvements`).reply(500, {
            message: errorMessage,
        });

        await store.loadProductMovements(uniqueCode);

        expect(store.loading).toBe(false);
        expect(store.error).toBe(errorMessage);
        expect(store.stock_movements).toEqual([]);
    });

    it('Devrait réinitialiser les erreurs avant de charger de nouvelles données', async () => {
        // Arrange
        const uniqueCode = '123';
        store.error = 'Erreur précédente'; // Simuler une erreur précédente

        const mockStockMovements: StockMovement[] = [
            {
                product : {
                    id: '1',
                    name: '123',
                    unique_code: '123'
                },
                type: 'in',
                reason: 'Stock entrepôt',
                expiration_date: '2023-10-01',
                quantity: 10
            },
        ];

        // Mock de la réponse de l'API
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/${uniqueCode}/mouvements`)
            .reply(200, { stock_movements: mockStockMovements });

        await store.loadProductMovements(uniqueCode);

        expect(store.error).toBeNull(); // L'erreur précédente doit être réinitialisée
        expect(store.stock_movements).toEqual(mockStockMovements); // Les nouvelles données doivent être chargées
    });

    it('Devrait gérer les réponses vides ou malformées de l\'API', async () => {

        const uniqueCode = '123';

        // Mock d'une réponse vide ou malformée
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/${uniqueCode}/mouvements`)
            .reply(200, {}); // Pas de champ "stock_movements"

        await store.loadProductMovements(uniqueCode);

        expect(store.loading).toBe(false); // Le chargement doit être terminé
        expect(store.error).toBe(null); // Une erreur doit être capturée
        expect(store.stock_movements).toEqual([]); // Aucune donnée ne doit être chargée
    });

    it('Devrait annuler la requête en cours si une nouvelle requête est lancée', async () => {
        // Arrange
        const uniqueCode = '123';
        const mockStockMovements: StockMovement[] = [
            {
                product : {
                    id: '1',
                    name: '123',
                    unique_code: '123'
                },
                type: 'in',
                reason: 'Stock entrepôt',
                expiration_date: '2023-10-01',
                quantity: 10
            },
        ];

        // Mock de la première requête avec un délai
        mockAxios
            .onGet(`${import.meta.env.VITE_API_URL}/stocks/${uniqueCode}/mouvements`)
            .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, { stock_movements: mockStockMovements }]), 200)));

        // Act
        const firstLoadPromise = store.loadProductMovements(uniqueCode);
        const secondLoadPromise = store.loadProductMovements(uniqueCode); // Nouvelle requête

        // Assert
        await firstLoadPromise; // La première requête doit être annulée
        await secondLoadPromise; // La deuxième requête doit être terminée

        expect(store.stock_movements).toEqual(mockStockMovements); // Les données doivent correspondre
    });
});
