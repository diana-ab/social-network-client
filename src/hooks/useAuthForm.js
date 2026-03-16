import { useState } from "react";
import { getAuthErrorMessage, getMessageFromApiError } from "../utils/errorMessages";

function useAuthForm(initialFormData) {
    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState("");

    const clearMessage = () => {
        setMessage("");
    };

    const setErrorCodeMessage = (errorCode) => {
        setMessage(getAuthErrorMessage(errorCode));
    };

    const setApiErrorMessage = (error) => {
        setMessage(getMessageFromApiError(error));
    };

    return {
        formData,
        setFormData,
        message,
        setMessage,
        clearMessage,
        setErrorCodeMessage,
        setApiErrorMessage,
    };
}

export default useAuthForm;