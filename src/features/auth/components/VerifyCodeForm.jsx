import DynamicForm from "../../../shared/ui/form/DynamicForm.jsx";
import AskForCodeSection from "./AskForCodeSection.jsx";

function VerifyCodeForm({
                            title,
                            formData,
                            setFormData,
                            onSubmit,
                            buttonText,
                            message,
                            footer,
                            resendButtonText,
                            onResendClick,
                            isResendDisabled,
                        }) {
    const fields = [
        {
            name: "code",
            label: "Verification Code",
            type: "text",
            placeholder: "Enter code",
            required: true,
        },
    ];

    return (
        <DynamicForm
            title={title}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={onSubmit}
            buttonText={buttonText}
            message={message}
            extraContent={
                <AskForCodeSection
                    buttonText={resendButtonText}
                    onResendClick={onResendClick}
                    disabled={isResendDisabled}
                />
            }
            footer={footer}
        />
    );
}

export default VerifyCodeForm;