import api from "../api/axiosClient";

export const registerUser = async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post("/login", userData);
    return response.data;
};

export const logoutUser = async (refreshToken) => {
    const response = await api.post("/logout", { refreshToken });
    return response.data;
};