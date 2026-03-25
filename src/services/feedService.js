import api from "../api/axiosClient";

export async function searchUsers(text) {
    console.log(text);
    const response = await api.post("/dashboard/search", {
        params: { text }
    });
    return response.data;
}

export async function followUser(userId) {
    const response = await api.post(`/dashboard/follow/${userId}`);
    return response.data;
}

export async function unfollowUser(userId) {
    const response = await api.delete(`/dashboard/follow/${userId}`);
    return response.data;
}

export async function getFollowing() {
    const response = await api.get("/dashboard/following");
    return response.data;
}

export async function getFeedPosts() {
    const response = await api.get("/dashboard/feed");
    return response.data;
}

export async function createPost(text) {
    const response = await api.post("/dashboard/posts", { text });
    return response.data;
}

export async function getMyProfile() {
    const response = await api.get("/dashboard/me");
    return response.data;
}