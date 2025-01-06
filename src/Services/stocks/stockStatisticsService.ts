import axios from "axios";

export const fetchStatistics = async (productId = null) => {
    const params = productId ? {product_id: productId} : {};
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks/statistics`, {
        params,
        headers: {Accept: 'application/json'}
    });
};
