//
// import { useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import { sendLoginCode, verifyLoginCode } from "../features/auth/services/authService.js";
// import DynamicForm from "../shared/ui/form/DynamicForm.jsx";
// import useAuthForm from "../features/auth/hooks/useAuthForm.js";
// import AskForCodeSection from "../features/auth/components/AskForCodeSection.jsx";
//
// function LoginVerifyPage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const tempToken = location.state?.tempToken;
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
//         if (!tempToken) {
//             navigate("/login", { replace: true });
//         }
//     }, [tempToken, navigate]);
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
//             const result = await verifyLoginCode({
//                 tempToken,
//                 code: formData.code,
//             });
//
//             if (result.success) {
//                 navigate("/feed", { replace: true });
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
//             title="Verify Login"
//             formData={formData}
//             setFormData={setFormData}
//             fields={fields}
//             onSubmit={handleVerify}
//             buttonText="Verify"
//             message={message}
//             extraContent={
//                 <AskForCodeSection
//                     sendCodeFunction={sendLoginCode}
//                     requestData={{ tempToken }}
//                     setErrorCodeMessage={setErrorCodeMessage}
//                     setApiErrorMessage={setApiErrorMessage}
//                     setSuccessMessage={setMessage}
//                 />
//             }
//             footer={
//                 <p>
//                     Back to <Link to="/login">login</Link>
//                 </p>
//             }
//         />
//     );
// }
//
// export default LoginVerifyPage;


import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendLoginCode, verifyLoginCode } from "../features/auth/services/authService.js";
import useAuthForm from "../features/auth/hooks/useAuthForm.js";
import useCodeSender from "../features/auth/hooks/useCodeSender.js";
import VerifyCodeForm from "../features/auth/components/VerifyCodeForm.jsx";

function LoginVerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const tempToken = location.state?.tempToken;

    const {formData, setFormData, message, clearMessage,
        setErrorCodeMessage, setApiErrorMessage, setMessage,} = useAuthForm({
        code: "",
    });

    useEffect(() => {
        if (!tempToken) {
            navigate("/login", { replace: true });
        }
    }, [tempToken, navigate]);

    const {
        handleResendClick, resendButtonText, isResendDisabled,} = useCodeSender({
        sendCodeFunction: sendLoginCode,
        requestData: { tempToken },
        setErrorCodeMessage,
        setApiErrorMessage,
        setSuccessMessage: setMessage,
    });

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
        <VerifyCodeForm
            title="Verify Login"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleVerify}
            buttonText="Verify"
            message={message}
            resendButtonText={resendButtonText}
            onResendClick={handleResendClick}
            isResendDisabled={isResendDisabled}
            footer={
                <p>
                    Back to <Link to="/login">login</Link>
                </p>
            }
        />
    );
}

export default LoginVerifyPage;
