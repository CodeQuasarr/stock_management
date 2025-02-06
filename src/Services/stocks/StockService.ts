import axios from "axios";
import type {Product, ProductUpdated} from "../../types";

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_HEADERS = { headers: { Accept: "application/json" } };

/**
 * Fetches stock movement data from the server.
 *
 * @async
 * @function
 * @param {string|null} [unique_code=null] - The unique identifier for the stock. If null, the server may fetch all stock movements or throw an error depending on the API configuration.
 * @returns {Promise<Object>} A promise that resolves to the stock movement data retrieved from the API.
 * @throws {Error} If the API request fails or an invalid response is returned.
 */
export const fetchStockMovement = async (unique_code: string | null = null) => {
    return await axios.get(`${API_URL}/stocks/${unique_code}/movements`, DEFAULT_HEADERS);
};

/**
 * Asynchronously fetches a list of products from the server.
 *
 * This function sends a GET request to the specified API endpoint for retrieving
 * product stock data. It uses the axios library to handle the HTTP request
 * and includes default headers for authorization or other configurations as required.
 *
 * @function
 * @async
 * @returns {Promise} A Promise that resolves to the response of the API call containing product data.
 * @throws {Error} Throws an error if the API request fails or cannot be completed.
 */
export const fetchProducts = async () => {
    return await axios.get(`${API_URL}/stocks`, DEFAULT_HEADERS);
};

/**
 * Asynchronously fetches product information from the server based on the given product ID.
 *
 * @param {number} product_id - The unique identifier of the product to retrieve information for.
 * @returns {Promise} A promise that resolves with the response from the server containing the product details.
 */
export const fetchProduct = async (product_id: number) => {
    return await axios.get(`${API_URL}/stocks/${product_id}`, DEFAULT_HEADERS);
};

/**
 * Updates the details of a product on the server.
 *
 * @async
 * @function
 * @param {number} product_id - The unique identifier of the product to be updated.
 * @param {Product} product - The product object containing the updated details.
 * @returns {Promise<any>} A promise representing the completion of the HTTP request, resolving with the server's response.
 */
export const updateProduct = async (product_id: number, product: ProductUpdated) => {
    return await axios.put(`${API_URL}/stocks/${product_id}`, product, DEFAULT_HEADERS);
};

/**
 * Asynchronously adds a new product to the stock inventory by sending a POST request.
 *
 * @async
 * @function
 * @param {Product} product - The product object to be added to the inventory.
 * @returns {Promise} A promise that resolves to the response of the POST request.
 */
export const addProduct = async (product: Product) => {
    return await axios.post(`${API_URL}/stocks`, product, DEFAULT_HEADERS);
};

/**
 * Asynchronously deletes a product by its ID.
 *
 * Sends an HTTP DELETE request to the API endpoint to remove the product
 * identified by the provided product ID. The request includes the default headers.
 *
 * @param {number} product_id - The unique identifier of the product to delete.
 * @returns {Promise} A Promise that resolves with the response of the HTTP DELETE request.
 */
export const deleteProduct = async (product_id: number) => {
    return await axios.delete(`${API_URL}/stocks/${product_id}`, DEFAULT_HEADERS);
};
