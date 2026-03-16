import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { completeRegister } from "../services/authService";
import DynamicForm from "../components/ui/form/DynamicForm.jsx";
import useAuthForm from "../hooks/useAuthForm";

function RegisterCompletePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const registrationToken = location.state?.registrationToken;

    const {
        formData,
        setFormData,
        message,
        setMessage,
        clearMessage,
        setErrorCodeMessage,
        setApiErrorMessage,
    } = useAuthForm({
        username: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!registrationToken) {
            navigate("/register", { replace: true });
        }
    }, [registrationToken, navigate]);

    const fields = [
        {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter username",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            required: true,
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm password",
            required: true,
        },
    ];

    const handleCompleteRegister = async (event) => {
        event.preventDefault();
        clearMessage();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const result = await completeRegister({
                registrationToken,
                username: formData.username,
                password: formData.password,
            });

            if (result.success) {
                navigate("/login", { replace: true });
            } else {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            setApiErrorMessage(error);
        }
    };

    return (
        <DynamicForm
            title="Complete Register"
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleCompleteRegister}
            buttonText="Register"
            message={message}
            footer={
                <p>
                    Back to <Link to="/login">login</Link>
                </p>
            }
        />
    );
}

export default RegisterCompletePage;