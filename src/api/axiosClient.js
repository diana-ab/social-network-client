import axios from "axios";
import {attachAuthInterceptor} from "./interceptors/authInterceptor.js";

const config = {
    baseURL: "http://localhost:8081",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
};

const api = axios.create(config);
const refreshApi = axios.create(config);

attachAuthInterceptor(api, refreshApi);

export default api;