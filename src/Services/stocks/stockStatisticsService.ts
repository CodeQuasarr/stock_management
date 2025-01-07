import axios from "axios";

export const fetchStatistics = async (unique_code: string|null = null) => {
    const params = unique_code ? {unique_code: unique_code} : {};
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks/statistics`, {
        params,
        headers: {Accept: 'application/json'}
    });
};
