import {useEffect, useState} from "react";

function AskForCodeSection({
                               sendCodeFunction,
                               requestData,
                               setErrorCodeMessage,
                               setApiErrorMessage,
                               setSuccessMessage,
                           }) {
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [isSending, setIsSending] = useState(false);

    const askForCode = async () => {
        if (isSending) {
            return;
        }

        setIsSending(true);

        try {
            const result = await sendCodeFunction(requestData);
            setSecondsLeft(60);
            if (result.success) {
                setSuccessMessage("A new code was sent.");
            } else {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            setApiErrorMessage(error);
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        askForCode();
    }, []);

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
        if (secondsLeft > 0) {
            return;
        }

        await askForCode();
    };

    return (
        <p>
            Didn’t get a code?{" "}
            <button type="button" onClick={handleResendClick} disabled={secondsLeft > 0 || isSending}>
                {secondsLeft > 0 ? `Send again in ${secondsLeft}s` : "Send again"}
            </button>
        </p>
    );
}

export default AskForCodeSection;