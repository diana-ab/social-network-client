import {useEffect, useState} from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {completeRegister} from "../features/auth/services/authService.js";
import DynamicForm from "../shared/ui/form/DynamicForm.jsx";
import useAuthForm from "../features/auth/hooks/useAuthForm.js";
import StatusBanner from "../shared/ui/StatusBanner.jsx";

function RegisterCompletePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const registrationToken = location.state?.registrationToken;
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

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
            console.log("Registration Token not set   ", registrationToken);
            navigate("/register", {replace: true});
        }
    }, [registrationToken, navigate]);



    useEffect(() => {
        if (!isRegisterSuccess) {
            return;
        }
        const timer = setTimeout(() => {
            navigate("/login", { replace: true });
        }, 4000);
        return () => clearTimeout(timer);
    }, [isRegisterSuccess, navigate]);




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
                setIsRegisterSuccess(true);
            } else {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            setApiErrorMessage(error);
        }
    };






    return (
        <div className="register-complete-page">
            <StatusBanner
                text={
                    isRegisterSuccess
                        ? "Welcome to The Empire. We own you… just kidding. (or do we?)"
                        : ""
                }
                variant="success"
            />

            <DynamicForm
                title="Complete Register"
                formData={formData}
                setFormData={setFormData}
                fields={fields}
                onSubmit={handleCompleteRegister}
                buttonText="Register"
                message={!isRegisterSuccess ? message : ""}
                footer={
                    <p>
                        Back to <Link to="/login">login</Link>
                    </p>
                }
            />
        </div>
    );
}

export default RegisterCompletePage;