import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== "/refresh"
        ) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await api.post("/refresh");

                if (refreshResponse.data && refreshResponse.data.success) {
                    return api(originalRequest);
                }
            } catch (refreshError) {
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;