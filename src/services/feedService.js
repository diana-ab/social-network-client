import api from "../api/axiosClient";

export async function searchUsers(text) {
    const response = await api.post("/dashboard/search", {
        text: text
    });
    return response.data;
}

export async function followUser(userId) {
    const response = await api.post("/dashboard/follow", {
        followedUserId: userId
    });
    return response.data;
}

export async function unfollowUser(userId) {
    const response = await api.delete("/dashboard/follow", {
        data: { followedUserId: userId }
    });
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