import {describe, expect, test} from "vitest";
import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import {
    addProduct,
    deleteProduct,
    fetchProduct,
    fetchProducts,
    fetchStockMovement,
    updateProduct
} from "../../Services/stocks/StockService.ts";

describe('Stock Service', () => {

    const mockAxios = new axiosMockAdapter(axios);

    test('fetchStockMovement', async () => {
        const unique_code = "UPC1";
        const stockMovementData = [
            {id: 1, product_code: "UPC1", type: "IN", quantity: 5, created_at: "2023-05-15T00:00:00Z"},
            {id: 2, product_code: "UPC1", type: "OUT", quantity: 2, created_at: "2023-05-16T00:00:00Z"}
        ];
        const API_URL = process.env.API_URL;
        const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

        mockAxios.onGet(`${API_URL}/stocks/${unique_code}/movements`)
            .reply(200, stockMovementData, DEFAULT_HEADERS);

        const response = await fetchStockMovement(unique_code);

        expect(response.data).toEqual(stockMovementData);
    });

    test('fetchProducts', async () => {
        const productsData = [
            {id: 1, name: "Product 1", price: 199.99, qty: 15},
            {id: 2, name: "Product 2", price: 249.99, qty: 10}
        ];
        const API_URL = process.env.API_URL;
        const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

        mockAxios.onGet(`${API_URL}/stocks`)
            .reply(200, productsData, DEFAULT_HEADERS);

        const response = await fetchProducts();

        expect(response.data).toEqual(productsData);
    });

    test('fetchProduct', async () => {
        const product_id = 1;
        const productData = {id: product_id, name: "Product 1", price: 199.99, qty: 15};
        const API_URL = process.env.API_URL;
        const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

        mockAxios.onGet(`${API_URL}/stocks/${product_id}`)
            .reply(200, productData, DEFAULT_HEADERS);

        const response = await fetchProduct(product_id);

        expect(response.data).toEqual(productData);
    });

    test('updateProduct', async () => {
        const product_id = 1;
        const updatedProductData = {
            id: product_id,
            movement_type: 'in',
            movement_reason: 'vente',
            movement_quantity: 10,
        };
        const API_URL = process.env.API_URL;
        const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

        mockAxios.onPut(`${API_URL}/stocks/${product_id}`)
            .reply(200, updatedProductData, DEFAULT_HEADERS);

        const response = await updateProduct(product_id, updatedProductData);

        expect(response.data).toEqual(updatedProductData);
    });

    test('addProduct', async () => {
        const newProductData = {
            name: "New Product",
            unique_code: "NP1",
            therapeutic_category: "Medical",
            description: "New product",
            sale_price: 250.99,
            manufacturer: "Manufacturer",
            stock_quantity: 30
        };
        const API_URL = process.env.API_URL;
        const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

        mockAxios.onPost(`${API_URL}/stocks`)
            .reply(200, {id: 2, ...newProductData}, DEFAULT_HEADERS);

        const response = await addProduct(newProductData);

        expect(response.data).toEqual({id: 2, ...newProductData});
    });

    test('deleteProduct', async () => {
        const product_id = 1;
        const API_URL = process.env.API_URL;
        const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

        mockAxios.onDelete(`${API_URL}/stocks/${product_id}`)
            .reply(200, {message: 'Product deleted successfully'}, DEFAULT_HEADERS);

        const response = await deleteProduct(product_id);

        expect(response.data).toEqual({message: 'Product deleted successfully'});
    });

});
