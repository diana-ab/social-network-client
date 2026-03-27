import {useEffect, useRef, useState} from "react";

function useCodeSender({
                           sendCodeFunction,
                           requestData,
                           setErrorCodeMessage,
                           setApiErrorMessage,
                           setSuccessMessage,
                           autoSend = true,
                           cooldownSeconds = 60,
                       }) {
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isSending, setIsSending] = useState(false);

    const hasSentInitialCode = useRef(false);
    const isSendingRef = useRef(false);

    const sendCode = async () => {
        if (!sendCodeFunction || !requestData || isSendingRef.current) {
            return;
        }

        isSendingRef.current = true;
        setIsSending(true);

        try {
            const result = await sendCodeFunction(requestData);

            if (result.success) {
                setSecondsLeft(cooldownSeconds);

                if (setSuccessMessage) {
                    setSuccessMessage("A new code was sent.");
                }
            } else if (setErrorCodeMessage) {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            if (setApiErrorMessage) {
                setApiErrorMessage(error);
            }
        } finally {
            isSendingRef.current = false;
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (!autoSend || hasSentInitialCode.current) {
            return;
        }

        hasSentInitialCode.current = true;
        sendCode();
    }, [autoSend]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [secondsLeft]);

    const handleResendClick = async () => {
        if (secondsLeft > 0 || isSending) {
            return;
        }

        await sendCode();
    };

    const resendButtonText = isSending
        ? "Sending..."
        : secondsLeft > 0
            ? `Send again in ${secondsLeft}s`
            : "Send again";

    const isResendDisabled = secondsLeft > 0 || isSending;

    return {
        secondsLeft,
        isSending,
        sendCode,
        handleResendClick,
        resendButtonText,
        isResendDisabled,
    };
}

export default useCodeSender;