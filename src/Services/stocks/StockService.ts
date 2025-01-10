import axios from "axios";
import type {Product} from "../../types";

export const fetchStockMovement = async (unique_code: string | null = null) => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks/${unique_code}/movements`, {
        headers: {Accept: 'application/json'}
    });
};

export const fetchProducts = async () => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks`, {
        headers: {Accept: 'application/json'}
    });
};

export const fetchProduct = async (product_id: number) => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks/${product_id}`, {
        headers: {Accept: 'application/json'}
    });
};

export const updateProduct = async (product_id: number, product: Product) => {
    return await axios.put(`${import.meta.env.VITE_API_URL}/stocks/${product_id}`, product, {
        headers: {Accept: 'application/json'}
    });
};

export const addProduct = async (product: Product) => {
    return await axios.post(`${import.meta.env.VITE_API_URL}/stocks`, product, {
        headers: {Accept: 'application/json'}
    });
};

export const deleteProduct = async (product_id: number) => {
    return await axios.delete(`${import.meta.env.VITE_API_URL}/stocks/${product_id}`, {
        headers: {Accept: 'application/json'}
    });
};
