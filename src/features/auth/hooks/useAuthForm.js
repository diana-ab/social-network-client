import {useState} from "react";
import useErrorMessage from "../../../shared/hooks/useErrorMessage.js";

function useAuthForm(initialFormData) {
    const [formData, setFormData] = useState(initialFormData);

    const {
        errorMessage: message,
        setErrorMessage: setMessage,
        clearErrorMessage,
        setErrorMessageByCode,
        setErrorMessageFromApiError,
    } = useErrorMessage();

    return {
        formData,
        setFormData,
        message,
        setMessage,
        clearMessage: clearErrorMessage,
        setErrorCodeMessage: setErrorMessageByCode,
        setApiErrorMessage: setErrorMessageFromApiError,
    };
}

export default useAuthForm;