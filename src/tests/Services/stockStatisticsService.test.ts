import {describe, expect, test} from "vitest";
import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import {fetchStatistics} from "../../Services/stocks/stockStatisticsService.ts";

describe('fetchStatistics', () => {
    const mockAxios = new axiosMockAdapter(axios);

    const API_URL = process.env.API_URL;
    const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

    test('should send a GET request to correct endpoint without unique code', async () => {
        const responseObj = {statistics: 'statistics data here'}
        mockAxios.onGet(`${API_URL}/stocks/statistics`).reply(200, responseObj, DEFAULT_HEADERS);

        const response = await fetchStatistics();

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseObj);
    });

    test('should send a GET request to correct endpoint with unique code', async () => {
        const unique_code = '123';
        const responseObj = {statistics: 'statistics data here'}

        mockAxios.onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, {params: {unique_code}})
            .reply(200, responseObj);

        const response = await fetchStatistics(unique_code);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseObj);
    });

    test('should handle errors gracefully if the request fails', async () => {
        const unique_code = '123';
        mockAxios.onGet(`${import.meta.env.VITE_API_URL}/stocks/statistics`, {params: {unique_code}}).reply(500);

        try {
            await fetchStatistics(unique_code);
        } catch (err: any) {
            expect(err).not.toBeNull();
            expect(err.response.status).toBe(500);
        }
    });
});
