import {onMounted, ref} from 'vue'
import type {Product, ProductUpdated} from '../types'
import {useStocksStore} from "../stores/stocksStore.ts";
import {useRouter} from "vue-router";

export function useProductForm(productId?: number) {
    const stockStore = useStocksStore();
    const router = useRouter();

    const errors = ref<Record<string, string>>({})

    const success = ref<string|null>(null)
    const loading = ref<boolean>(false);

    const defaultProduct: Product = {
        name: 'Loratadine 10 mg',
        unique_code: 'LRDC10',
        description: 'Allergie et rhume des foins',
        purchase_price: 0.80,
        sale_price: 1.50,
        stock_quantity: 250,
        expiration_date: '' as string,
        therapeutic_category: 'Allergies',
        manufacturer: 'BioPharm',
    };
    const product = ref<Product>({ ...defaultProduct });
    const productField = ref<ProductUpdated>({
        movement_type: '',
        movement_reason: '',
        movement_quantity: 0,

    })

    /**
     * Asynchronously fetches and sets the product details based on the provided productId.
     *
     * This function attempts to load product data from the stockStore using the productId,
     * manages the loading state, and handles potential errors during the process. If the
     * product data is empty, it redirects the user to the 404 error page.
     *
     * @async
     * @function getProduct
     * @throws Will catch and handle any errors that occur during the product loading process.
     */
    const getProduct = async () => {
        if (!productId) return;

        loading.value = true;
        try {
            await stockStore.loadProduct(productId);
            product.value = stockStore.product;

            if (Object.keys(product.value).length === 0) {
                await router.push({name: 'Error404'});
            }
        } catch (err: any) {
            errors.value.message = err.message;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Validates the input data of a product and its associated field values.
     *
     * This function checks for required fields, validates that certain fields
     * are positive numbers, and ensures that all necessary data is provided.
     * If any validation rules are violated, error messages are added to the
     * `errors` object. Returns a boolean indicating whether validation succeeded.
     *
     * The following validations are performed:
     * - `name`: Must not be empty.
     * - `unique_code`: Must not be empty.
     * - `manufacturer`: Must not be empty.
     * - `purchase_price`: Must be a non-negative number.
     * - `stock_quantity`: Must be a non-negative number.
     * - `therapeutic_category`: Must not be empty.
     * - `expiration_date`: If provided, must not be empty or whitespace.
     * - `movement_type`: Must not be empty or whitespace.
     * - `movement_reason`: Must not be empty or whitespace.
     * - `movement_quantity`: Must not be zero.
     *
     * @returns {boolean} True if all validations pass, false otherwise.
     */
    const validate = () => {
        errors.value = {}

        const { name, unique_code, manufacturer, purchase_price, stock_quantity, therapeutic_category, expiration_date } = product.value;
        const { movement_type, movement_reason, movement_quantity } = productField.value

        if (!name) errors.value.name = 'Le nom du produit est requis';
        if (!unique_code) errors.value.sku = 'Le code unique est requis';
        if (!manufacturer) errors.value.supplierId = 'Le fabricant est requis';
        if (purchase_price! < 0) errors.value.price = 'Le prix doit être positif';
        if (stock_quantity! < 0) errors.value.quantity = 'La quantité doit être positive';
        if (!therapeutic_category) errors.value.therapeutic_category = 'La catégorie thérapeutique est requise';
        if (expiration_date && !expiration_date.trim()) errors.value.expiration_date = 'La date d\'expiration est requise';
        if (movement_type && !movement_type.trim()) errors.value.movement_type = 'Le type de mouvement est requis';
        if (movement_reason && !movement_reason.trim()) errors.value.movement_reason = 'La raison du mouvement est requise';
        if (movement_quantity === 0) errors.value.movement_quantity = 'La quantité du mouvement est requise';

        return Object.keys(errors.value).length === 0;
    }

    /**
     * An asynchronous function to save a product. Depending on the existence of `productId`,
     * it either updates or adds a product to the stock. Handles loading state, success and error messages,
     * and product navigation upon successful addition.
     *
     * @async
     * @function
     * @returns {Promise<boolean>} Returns `true` if the operation is successful, otherwise `false`.
     *
     * @throws {Error} Logs any unexpected errors occurring during execution.
     */
    const save = async () => {
        if (!validate()) return false
        loading.value = true;

        try {
            if (productId) {
                await stockStore.updateProduct(productId, productField.value)

                if (stockStore.success) {
                    adjustStockQuantity();
                    success.value = stockStore.success;
                } else if (stockStore.error) {
                    errors.value.message = stockStore.error;
                }
                errors.value.message = stockStore.error ?? ''
            } else {
                await stockStore.addProduct(product.value as Product)

                if (stockStore.product_id) {
                    navigateToProductPage();
                } else {
                    errors.value.message = stockStore.error ?? '';
                }
            }
            return true
        } catch (err: any) {
            console.error('error', stockStore.error);
        } finally {
            loading.value = false;
        }
    }

    /**
     * Adjusts the stock quantity of a product based on the movement type and movement quantity.
     *
     * The function first verifies if the `movement_quantity` exists in the `productField` object.
     * If it does not, the function will terminate without making any changes.
     *
     * Depending on the `movement_type` value:
     * - If `movement_type` is 'out', the `movement_quantity` will be subtracted from the current `stock_quantity` of the product.
     * - If `movement_type` is 'in', the `movement_quantity` will be added to the current `stock_quantity` of the product.
     *
     * This function modifies the `stock_quantity` property of the `product` object directly.
     */
    const adjustStockQuantity = () => {
        if (!productField.value.movement_quantity) return;

        const { movement_type, movement_quantity } = productField.value;

        if (movement_type === 'out') {
            product.value.stock_quantity -= movement_quantity!;
        } else if (movement_type === 'in') {
            product.value.stock_quantity += movement_quantity!;
        }
    };

    /**
     * Navigates the user to the product page based on the current product ID.
     *
     * Uses the product ID from the `stockStore` to dynamically generate the URL
     * for navigation. Updates the browser's location to point to the specified
     * product page.
     */
    const navigateToProductPage = () => {
        window.location.href = `/products/${stockStore.product_id}`;
    };


    onMounted(async () => {
        if (productId) await getProduct();
    })

    return {
        product,
        productField,
        errors,
        success,
        save
    }
}
