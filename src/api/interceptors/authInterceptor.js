import {addPendingRequest, clearPendingRequests, getIsRefreshing, runPendingRequests, setIsRefreshing,} from "../auth/authQueue.js";
import {createApiError, isAuthError, isRefreshRequest, redirectToLogin,} from "../auth/authHelpers.js";

export function attachAuthInterceptor(api, refreshApi) {
    api.interceptors.response.use(
        async (response) => {
            const responseData = response?.data;
            const errorCode = responseData?.errorCode;
            const originalRequest = response.config;
            if (responseData?.success !== false) {
                return response;
            }
            const shouldTryRefresh =
                !isRefreshRequest(originalRequest?.url) &&
                isAuthError(errorCode);
            if (!shouldTryRefresh) {
                return Promise.reject(createApiError(response));
            }
            if (!getIsRefreshing()) {
                setIsRefreshing(true);
                try {
                    const refreshResponse = await refreshApi.post("/refresh");
                    setIsRefreshing(false);

                    if (refreshResponse?.data?.success) {
                        runPendingRequests();
                        return api(originalRequest);
                    }
                    clearPendingRequests();
                    redirectToLogin();
                    return Promise.reject(createApiError(response));
                } catch (refreshError) {
                    setIsRefreshing(false);
                    clearPendingRequests();
                    redirectToLogin();
                    return Promise.reject(refreshError);
                }
            }
            return new Promise((resolve, reject) => {
                addPendingRequest(() => {
                    api(originalRequest)
                        .then(resolve)
                        .catch(reject);
                });
            });
        },
        (error) => Promise.reject(error)
    );
}