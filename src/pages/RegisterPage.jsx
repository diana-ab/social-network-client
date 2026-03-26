import {useNavigate, Link} from "react-router-dom";
import {sendRegisterCode} from "../features/auth/services/authService.js";
import DynamicForm from "../shared/ui/form/DynamicForm.jsx";
import useAuthForm from "../features/auth/hooks/useAuthForm.js";

function RegisterPage() {
    const navigate = useNavigate();

    const {
        formData,
        setFormData,
        message,
        clearMessage,
        setErrorCodeMessage,
        setApiErrorMessage,
    } = useAuthForm({
        email: "",
    });

    const fields = [
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter email",
            required: true,
        },
    ];

    const handleSendCode = async (event) => {
        event.preventDefault();
        clearMessage();

        try {
            const result = await sendRegisterCode({
                email: formData.email,
            });

            if (result.success) {
                navigate("/register/verify", {
                    state: {email: formData.email},
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
            title="Register"
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSendCode}
            buttonText="Send Code"
            message={message}
            footer={
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            }
        />
    );
}

export default RegisterPage;