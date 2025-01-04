import axios from "axios";

export const fetchStatistics = async () => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/stocks/statistics`, {
        headers: {
            Accept: 'application/json',
        }
    })
};
