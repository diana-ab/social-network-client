//
// import { useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import {
//     sendRegisterCode,
//     verifyRegisterCode,
// } from "../features/auth/services/authService.js";
// import DynamicForm from "../shared/ui/form/DynamicForm.jsx";
// import useAuthForm from "../features/auth/hooks/useAuthForm.js";
// import AskForCodeSection from "../features/auth/components/AskForCodeSection.jsx";
//
// function RegisterVerifyPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const email = location.state?.email;
//
//     const {
//         formData,
//         setFormData,
//         message,
//         clearMessage,
//         setErrorCodeMessage,
//         setApiErrorMessage,
//         setMessage,
//     } = useAuthForm({
//         code: "",
//     });
//
//     useEffect(() => {
//         if (!email) {
//             navigate("/register", { replace: true });
//         }
//     }, [email, navigate]);
//
//     const fields = [
//         {
//             name: "code",
//             label: "Verification Code",
//             type: "text",
//             placeholder: "Enter code",
//             required: true,
//         },
//     ];
//
//     const handleVerify = async (event) => {
//         event.preventDefault();
//         clearMessage();
//
//         try {
//             const result = await verifyRegisterCode({
//                 email,
//                 code: formData.code,
//             });
//
//             if (result.success) {
//                 navigate("/register/complete", {
//                     state: {
//                         registrationToken: result.tempToken,
//                     },
//                 });
//             } else {
//                 setErrorCodeMessage(result.errorCode);
//             }
//         } catch (error) {
//             setApiErrorMessage(error);
//         }
//     };
//
//     return (
//         <DynamicForm
//             title="Verify Register"
//             formData={formData}
//             setFormData={setFormData}
//             fields={fields}
//             onSubmit={handleVerify}
//             buttonText="Continue"
//             message={message}
//             extraContent={
//                 <AskForCodeSection
//                     sendCodeFunction={sendRegisterCode}
//                     requestData={{ email }}
//                     setErrorCodeMessage={setErrorCodeMessage}
//                     setApiErrorMessage={setApiErrorMessage}
//                     setSuccessMessage={setMessage}
//                 />
//             }
//             footer={
//                 <p>
//                     Back to <Link to="/register">register</Link>
//                 </p>
//             }
//         />
//     );
// }
//
// export default RegisterVerifyPage;

import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    sendRegisterCode,
    verifyRegisterCode,
} from "../features/auth/services/authService.js";
import useAuthForm from "../features/auth/hooks/useAuthForm.js";
import useCodeSender from "../features/auth/hooks/useCodeSender.js";
import VerifyCodeForm from "../features/auth/components/VerifyCodeForm.jsx";

function RegisterVerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const {
        formData, setFormData, message, clearMessage,
        setErrorCodeMessage, setApiErrorMessage, setMessage,} = useAuthForm({
        code: "",
    });

    useEffect(() => {
        if (!email) {
            navigate("/register", { replace: true });
        }
    }, [email, navigate]);

    const {handleResendClick, resendButtonText, isResendDisabled,} = useCodeSender({
        sendCodeFunction: sendRegisterCode,
        requestData: { email },
        setErrorCodeMessage,
        setApiErrorMessage,
        setSuccessMessage: setMessage,
    });

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
                        registrationToken: result.tempToken,
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
        <VerifyCodeForm
            title="Verify Register"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleVerify}
            buttonText="Continue"
            message={message}
            resendButtonText={resendButtonText}
            onResendClick={handleResendClick}
            isResendDisabled={isResendDisabled}
            footer={
                <p>
                    Back to <Link to="/register">register</Link>
                </p>
            }
        />
    );
}

export default RegisterVerifyPage;