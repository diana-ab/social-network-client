let isRefreshing = false;
let pendingRequests = [];

export function getIsRefreshing() {
    return isRefreshing;
}

export function setIsRefreshing(value) {
    isRefreshing = value;
}

export function addPendingRequest(callback) {
    pendingRequests.push(callback);
}

export function runPendingRequests() {
    pendingRequests.forEach((callback) => callback());
    pendingRequests = [];
}

export function clearPendingRequests() {
    pendingRequests = [];
}