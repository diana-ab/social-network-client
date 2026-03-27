import {ERROR_CODES} from "../constants/errorCodes.js";

export const ERROR_MESSAGES = {
    [ERROR_CODES.INVALID_REQUEST]: "Invalid request.",

    [ERROR_CODES.MISSING_USERNAME]: "Username is required.",
    [ERROR_CODES.INVALID_USERNAME]: "Invalid username.",

    [ERROR_CODES.MISSING_PASSWORD]: "Password is required.",
    [ERROR_CODES.INVALID_PASSWORD]: "Invalid password.",

    [ERROR_CODES.MISSING_EMAIL]: "Email is required.",
    [ERROR_CODES.INVALID_EMAIL]: "Invalid email address.",
    [ERROR_CODES.INVALID_SEND_CODE]: "Invalid verification code.",

    [ERROR_CODES.USERNAME_ALREADY_EXISTS]: "Username already exists.",
    [ERROR_CODES.EMAIL_ALREADY_EXISTS]: "Email already exists.",
    [ERROR_CODES.USER_ALREADY_EXISTS]: "User already exists.",

    [ERROR_CODES.INVALID_CREDENTIALS]: "Invalid username or password.",

    [ERROR_CODES.REGISTRATION_FAILED]: "Registration failed.",
    [ERROR_CODES.INVALID_POST]: "Invalid post.",

    [ERROR_CODES.INTERNAL_SERVER_ERROR]: "Internal server error.",

    [ERROR_CODES.INVALID_TOKEN]: "Your session has expired. Please log in again.",
    [ERROR_CODES.UNAUTHORIZED]: "You are not authorized. Please log in again.",
    [ERROR_CODES.FORBIDDEN]: "You are not allowed to perform this action.",

    [ERROR_CODES.INVALID_PROFILE_IMAGE]: "Invalid profile image URL.",
    [ERROR_CODES.FOLLOW_FAILURE]: "Failed to follow user.",
    [ERROR_CODES.UNFOLLOW_FAILURE]: "Failed to unfollow user.",
    [ERROR_CODES.POST_FAILURE]: "Failed to create post.",
    [ERROR_CODES.POST_DELETE_FAILURE]: "Failed to delete post.",
    [ERROR_CODES.USER_NOT_FOUND]: "User not found.",
    [ERROR_CODES.POST_NOT_FOUND]: "Post not found.",
};

export function getErrorMessageByCode(errorCode) {
    return ERROR_MESSAGES[errorCode] || "Something went wrong.";
}

export function getMessageFromApiError(error) {
    const errorCode = error?.response?.data?.errorCode;

    if (errorCode) {
        return getErrorMessageByCode(errorCode);
    }

    if (error?.message === "Network Error") {
        return "Unable to connect to the server. Please try again.";
    }

    return "Something went wrong.";
}