import api from "../../../api/axiosClient.js";

export const getFeedPosts = async () => {
    const response = await api.get("/feed");
    return response.data;
};

export const createPost = async (content) => {
    const response = await api.post("/posts", { content });
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};