import axios from "axios";
// import {redirectToLogin} from "../utils/navigation.js";

const api = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
//
// let isRefreshing = false;
// let pendingRequests = [];

// api.interceptors.response.use(
//     async (response) => {
//         if (
//             response.config.url !== "/refresh" &&
//             response.data &&
//             response.data.success === false
//         ) {
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 try {
//                     const refreshResponse = await api.post("/refresh");
//                     if (refreshResponse.data?.success) {
//                         isRefreshing = false;
//                         pendingRequests.forEach((callback) => callback());
//                         pendingRequests = [];
//                         return api(response.config);
//                     }
//
//                 } catch (refreshError) {
//                     isRefreshing = false;
//                     redirectToLogin();
//                     return Promise.reject(refreshError);
//                 }
//             }
//             return new Promise((resolve) => {
//                 pendingRequests.push(() => {
//                     resolve(api(response.config));
//                 });
//             });
//         }
//         return response;
//     },
//
//     (error) => {
//         console.error("API error:", error);
//         return Promise.reject(error);
//     }
// );

export default api;