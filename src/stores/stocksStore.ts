import {defineStore} from 'pinia';
import {
    addProduct,
    deleteProduct,
    fetchProduct,
    fetchProducts,
    fetchStockMovement, updateProduct
} from "../Services/stocks/StockService.ts";
import type {Product, ProductUpdated, StockMovement, StockState} from "../types";
import {formatErrors} from "../utils/FormatError.ts";

export const useStocksStore = defineStore('stocks', {
    state: (): StockState => ({
        stock_movements: [] as StockMovement[],
        products: [] as Product[],
        product: {} as Product,
        product_id: 0 as number,
        loading: false as boolean,
        error: null as string|null,
        success: null as string|null,
    }),
    actions: {
        async loadProducts() {
            this.setLoadingState();
            try {
                const response = await fetchProducts();
                this.$state.products = response.data.data ?? [];
            } catch (error: any) {
                this.$state.error = error.response.data.message;
            } finally {
                this.$state.loading = false;
            }
        },

        async loadProduct(product_id: number) {
            this.setLoadingState();
            try {
                const response = await fetchProduct(product_id);
                this.$state.product = response.data.data ?? {};
            } catch (error: any) {
                this.$state.error = error.response.data.message;
            } finally {
                this.$state.loading = false;
            }
        },

        async updateProduct(product_id: number, product: ProductUpdated) {
            this.setLoadingState();
            try {
                const response = await updateProduct(product_id, product);
                this.$state.success = response.data.success;
            } catch (error: any) {
                if (error.response.data.errors) {
                    console.log(error.response.data.errors);
                    this.$state.error = formatErrors(error.response.data.errors);
                } else {
                    this.$state.error = error.response.data.message;
                }
            } finally {
                this.$state.loading = false;
            }
        },

        async addProduct(product: Product) {
            this.setLoadingState();
            try {
                const response = await addProduct(product);
                this.$state.product_id = response.data.data;
            } catch (error: any) {
                if (error.response.data.errors) {
                    this.$state.error = formatErrors(error.response.data.errors);
                } else {
                    this.error = error.response?.data?.message ?? 'Failed to add product.';
                }
            } finally {
                this.$state.loading = false;
            }
        },

        async deleteProduct(product_id: number) {
            this.setLoadingState();
            try {
                await deleteProduct(product_id);
                await this.loadProducts();
            } catch (error: any) {
                this.error = error.response?.data?.message ?? 'Failed to delete product.';
            } finally {
                this.$state.loading = false;
            }
        },

        async loadProductMovements(unique_code: string|null = null) {
            this.setLoadingState();
            try {
                const response = await fetchStockMovement(unique_code);
                this.$state.stock_movements = response.data.data ?? [];
            } catch (error: any) {
                this.error = error.response?.data?.message ?? 'Failed to load stock movements.';
            } finally {
                this.$state.loading = false;
            }
        },
        setLoadingState() {
            this.loading = true;
            this.error = null;
        }
    },
});
