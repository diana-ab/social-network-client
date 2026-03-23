import {useEffect, useRef, useState} from "react";

function AskForCodeSection({
                               sendCodeFunction,
                               requestData,
                               setErrorCodeMessage,
                               setApiErrorMessage,
                               setSuccessMessage,
                           }) {
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [isSending, setIsSending] = useState(false);

    const hasSentInitialCode =useRef(false);
    const isSendingRef = useRef(false);


    const askForCode = async () => {
        console.log("askForCode  " + isSendingRef.current);
        if (isSendingRef.current) {
            return;
        }
        isSendingRef.current = true;
        setIsSending(true);

        try {
            const result = await sendCodeFunction(requestData);
            console.log(result);
            if (result.success) {
                setSecondsLeft(60);
                setSuccessMessage("A new code was sent.");
            } else {
                setErrorCodeMessage(result.errorCode);
            }
        } catch (error) {
            setApiErrorMessage(error);
        } finally {
            isSendingRef.current = false;
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (hasSentInitialCode.current) {
            return;
        }
        hasSentInitialCode.current = true;
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
                {isSending ? "Sending..."
                    : secondsLeft > 0 ? `Send again in ${secondsLeft}s` : "Send again"}
            </button>
        </p>
    );
}

export default AskForCodeSection;