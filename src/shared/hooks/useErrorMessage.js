import {useState} from "react";
import {getErrorMessageByCode, getMessageFromApiError} from "../utils/errorMessages.js";

function useErrorMessage() {
    const [errorMessage, setErrorMessage] = useState("");

    const clearErrorMessage = () => {
        setErrorMessage("");
    };

    const setErrorMessageByCode = (errorCode) => {
        setErrorMessage(getErrorMessageByCode(errorCode));
    };

    const setErrorMessageFromApiError = (error) => {
        setErrorMessage(getMessageFromApiError(error));
    };

    return {
        errorMessage,
        setErrorMessage,
        clearErrorMessage,
        setErrorMessageByCode,
        setErrorMessageFromApiError,
    };
}

export default useErrorMessage;