//
// import { useEffect, useRef, useState } from "react";
// import CustomButton from "../../../shared/ui/button/CustomButton.jsx";
// import "./AskForCodeSection.css";
//
// function AskForCodeSection({
//                                sendCodeFunction,
//                                requestData,
//                                setErrorCodeMessage,
//                                setApiErrorMessage,
//                                setSuccessMessage,
//                                autoSend = true,
//                                cooldownSeconds = 60,
//                            }) {
//     const [secondsLeft, setSecondsLeft] = useState(0);
//     const [isSending, setIsSending] = useState(false);
//
//     const hasSentInitialCode = useRef(false);
//     const isSendingRef = useRef(false);
//
//     const askForCode = async () => {
//         if (!sendCodeFunction || !requestData || isSendingRef.current) {
//             return;
//         }
//
//         isSendingRef.current = true;
//         setIsSending(true);
//
//         try {
//             const result = await sendCodeFunction(requestData);
//
//             if (result.success) {
//                 setSecondsLeft(cooldownSeconds);
//
//                 if (setSuccessMessage) {
//                     setSuccessMessage("A new code was sent.");
//                 }
//             } else {
//                 setErrorCodeMessage(result.errorCode);
//             }
//         } catch (error) {
//             setApiErrorMessage(error);
//         } finally {
//             isSendingRef.current = false;
//             setIsSending(false);
//         }
//     };
//
//     useEffect(() => {
//         if (!autoSend || hasSentInitialCode.current) {
//             return;
//         }
//
//         hasSentInitialCode.current = true;
//         askForCode();
//     }, [autoSend]);
//
//     useEffect(() => {
//         if (secondsLeft <= 0) {
//             return;
//         }
//
//         const timer = setTimeout(() => {
//             setSecondsLeft((prev) => prev - 1);
//         }, 1000);
//
//         return () => clearTimeout(timer);
//     }, [secondsLeft]);
//
//     const handleResendClick = async () => {
//         if (secondsLeft > 0 || isSending) {
//             return;
//         }
//
//         await askForCode();
//     };
//
//     const buttonText = isSending
//         ? "Sending..."
//         : secondsLeft > 0
//             ? `Send again in ${secondsLeft}s`
//             : "Send again";
//
//     return (
//         <div className="ask-for-code-section">
//             <p className="ask-for-code-section__text">Didn’t get a code?</p>
//
//             <CustomButton
//                 type="button"
//                 onClick={handleResendClick}
//                 disabled={secondsLeft > 0 || isSending}
//                 variant="ghost"
//                 size="small"
//                 fullWidth={false}
//                 className="ask-for-code-section__button"
//                 text={buttonText}
//             />
//         </div>
//     );
// }
//
// export default AskForCodeSection;


import CustomButton from "../../../shared/ui/button/CustomButton.jsx";
import "./AskForCodeSection.css";

function AskForCodeSection({
                               text = "Didn’t get a code?",
                               buttonText,
                               onResendClick,
                               disabled,
                           }) {
    return (
        <div className="ask-for-code-section">
            <p className="ask-for-code-section__text">{text}</p>

            <CustomButton
                type="button"
                onClick={onResendClick}
                disabled={disabled}
                variant="ghost"
                size="small"
                fullWidth={false}
                className="ask-for-code-section__button"
                text={buttonText}
            />
        </div>
    );
}

export default AskForCodeSection;