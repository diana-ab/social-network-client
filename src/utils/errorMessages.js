export const AUTH_ERRORS = {
    INVALID_REQUEST: 1000,

    MISSING_USERNAME: 1001,
    INVALID_USERNAME: 1002,

    MISSING_PASSWORD: 1003,
    INVALID_PASSWORD: 1004,

    MISSING_EMAIL: 1005,
    INVALID_EMAIL: 1006,

    USERNAME_ALREADY_EXISTS: 2000,
    EMAIL_ALREADY_EXISTS: 2001,
    USER_ALREADY_EXISTS: 2002,

    INVALID_CREDENTIALS: 3000,

    REGISTRATION_FAILED: 4000,
    INTERNAL_SERVER_ERROR: 5000,

    INVALID_TOKEN: 6000,
};

export const AUTH_ERROR_MESSAGES = {
    [AUTH_ERRORS.INVALID_REQUEST]: "Invalid request.",

    [AUTH_ERRORS.MISSING_USERNAME]: "Username is required.",
    [AUTH_ERRORS.INVALID_USERNAME]: "Invalid username.",

    [AUTH_ERRORS.MISSING_PASSWORD]: "Password is required.",
    [AUTH_ERRORS.INVALID_PASSWORD]: "Invalid password.",

    [AUTH_ERRORS.MISSING_EMAIL]: "Email is required.",
    [AUTH_ERRORS.INVALID_EMAIL]: "Invalid email.",

    [AUTH_ERRORS.USERNAME_ALREADY_EXISTS]: "Username already exists.",
    [AUTH_ERRORS.EMAIL_ALREADY_EXISTS]: "Email already exists.",
    [AUTH_ERRORS.USER_ALREADY_EXISTS]: "User already exists.",

    [AUTH_ERRORS.INVALID_CREDENTIALS]: "Invalid username or password.",

    [AUTH_ERRORS.REGISTRATION_FAILED]: "Registration failed.",
    [AUTH_ERRORS.INTERNAL_SERVER_ERROR]: "Internal server error.",

    [AUTH_ERRORS.INVALID_TOKEN]: "Invalid token.",
};

export function getAuthErrorMessage(errorCode) {
    return AUTH_ERROR_MESSAGES[errorCode] || "Something went wrong.";
}

export function getMessageFromApiError(error) {
    const errorCode = error?.response?.data?.errorCode;
    return getAuthErrorMessage(errorCode);
}