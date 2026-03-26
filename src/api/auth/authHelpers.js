import {ERROR_CODES} from "../../shared/constants/errorCodes.js";

export function isAuthError(errorCode) {
    return (
        errorCode === ERROR_CODES.UNAUTHORIZED ||
        errorCode === ERROR_CODES.INVALID_TOKEN
    );
}

export function isRefreshRequest(url) {
    return url === "/refresh";
}

export function createApiError(response) {
    return {
        response: {
            data: response.data,
            status: response.status,
        },
    };
}

export function redirectToLogin() {
    window.location.href = "/login";
}