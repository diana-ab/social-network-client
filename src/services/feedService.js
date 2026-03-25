import api from "../api/axiosClient";



export const searchUsers = async (data) => {
    const response = await api.post("/follows/search", data);
    return response.data;
};

export const followUser = async (userId) => {
    const response = await api.post("/SOME-ENDPOINT", { userId });
    return response.data;
};

export const unfollowUser = async (userId) => {
    const response = await api.delete("/SOME-ENDPOINT");
    return response.data;
};