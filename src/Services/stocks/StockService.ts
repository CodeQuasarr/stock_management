import axios from "axios";

export const fetchStockMovement = async (unique_code: string|null = null) => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks/${unique_code}/mouvements`, {
        headers: {Accept: 'application/json'}
    });
};
