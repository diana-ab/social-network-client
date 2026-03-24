import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {sendLoginCode, verifyLoginCode} from "../services/authService";
import DynamicForm from "../components/ui/form/DynamicForm.jsx";
import useAuthForm from "../hooks/useAuthForm";
import AskForCodeSection from "../components/atuh/AskForCodeSection.jsx";

function LoginVerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const tempToken = location.state?.tempToken;
    const {
        formData,
        setFormData,
        message,
        clearMessage,
        setErrorCodeMessage,
        setApiErrorMessage,
    } = useAuthForm({
        code: "",
    });

    useEffect(() => {
        if (!tempToken) {
            navigate("/login", { replace: true });
        }
    }, [tempToken, navigate]);




    const fields = [
        {
            name: "code",
            label: "Verification Code",
            type: "text",
            placeholder: "Enter code",
            required: true,
        },
    ];


    const handleVerify = async (event) => {
        event.preventDefault();
        clearMessage();

        try {
            const result = await verifyLoginCode({
                tempToken,
                code: formData.code,
            });

            if (result.success) {
                navigate("/feed", { replace: true });
            } else {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            setApiErrorMessage(error);
        }
    };





    return (
        <DynamicForm
            title="Verify Login"
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleVerify}
            buttonText="Verify"
            message={message}
            extraContent={
                <AskForCodeSection
                    sendCodeFunction={sendLoginCode}
                    requestData={{ tempToken }}
                    setErrorCodeMessage={setErrorCodeMessage}
                    setApiErrorMessage={setApiErrorMessage}
                    setSuccessMessage={() => {}}
                />
            }
            footer={
                <p>
                    Back to <Link to="/login">login</Link>
                </p>
            }
        />
    );
}

export default LoginVerifyPage;