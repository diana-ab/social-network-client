
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/services/authService.js";
import DynamicForm from "../shared/ui/form/DynamicForm.jsx";
import useAuthForm from "../features/auth/hooks/useAuthForm.js";

function LoginPage() {
    const navigate = useNavigate();

    const {
        formData,
        setFormData,
        message,
        clearMessage,
        setErrorCodeMessage,
        setApiErrorMessage,
    } = useAuthForm({
        username: "",
        password: "",
    });

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
    ];

    const handleLogin = async (event) => {
        event.preventDefault();
        clearMessage();

        try {
            const result = await loginUser({
                username: formData.username,
                password: formData.password,
            });

            if (result.success) {
                navigate("/login/verify", {
                    state: {
                        tempToken: result.tempToken,
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
            title="Log into The Empire"
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleLogin}
            buttonText="Log in"
            message={message}
            footer={
                <p>
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            }
        />
    );
}

export default LoginPage;