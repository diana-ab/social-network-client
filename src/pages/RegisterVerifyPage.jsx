import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { verifyRegisterCode } from "../services/authService";
import DynamicForm from "../components/ui/form/DynamicForm.jsx";
import useAuthForm from "../hooks/useAuthForm";

function RegisterVerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
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
        if (!email) {
            navigate("/register", { replace: true });
        }
    }, [email, navigate]);

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
            const result = await verifyRegisterCode({
                email,
                code: formData.code,
            });

            if (result.success) {
                navigate("/register/complete", {
                    state: {
                        registrationToken: result.registrationToken,
                    },
                });
            } else {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            setApiErrorMessage(error);
        }
    };

    return (
        <DynamicForm
            title="Verify Register"
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleVerify}
            buttonText="Continue"
            message={message}
            footer={
                <p>
                    Back to <Link to="/register">register</Link>
                </p>
            }
        />
    );
}

export default RegisterVerifyPage;