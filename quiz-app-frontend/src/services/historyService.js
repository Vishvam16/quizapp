import api from "./api";

export const getHistory = async () => {
    const response = await api.get("/quiz/history");
    return response.data;
};