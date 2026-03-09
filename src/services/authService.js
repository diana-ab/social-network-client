import api from "../api/axiosClient";

export const registerUser = async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
};