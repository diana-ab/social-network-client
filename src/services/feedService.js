

import api from "./axiosClient.js";

export const searchUsers = async (searchTerm) => {
    const response = await api.get("/SOME-ENDPOINT", {
        params: { q: searchTerm },
    });
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