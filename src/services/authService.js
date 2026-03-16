import api from "../api/axiosClient";

export const loginUser = async (data) => {
    const response = await api.post("/login", data);
    return response.data;
};

export const verifyLoginCode = async (data) => {
    const response = await api.post("/login/verify-code", data);
    return response.data;
};

export const sendRegisterCode = async (data) => {
    const response = await api.post("/register/send-code", data);
    return response.data;
};

export const verifyRegisterCode = async (data) => {
    const response = await api.post("/register/verify-code", data);
    return response.data;
};

export const completeRegister = async (data) => {
    const response = await api.post("/register", data);
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/logout");
    return response.data;
};

export const refreshUser = async () => {
    const response = await api.post("/refresh");
    return response.data;
};