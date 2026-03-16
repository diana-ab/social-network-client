import CustomInput from "../input/CustomInput.jsx";
import CustomButton from "../button/CustomButton.jsx";
import FormCard from "./FormCard.jsx";
import FormMessage from "./FormMessage.jsx";

function DynamicForm({
                         title,
                         formData,
                         setFormData,
                         fields,
                         onSubmit,
                         buttonText,
                         message,
                         footer = null
                     }) {
    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const isFormIncomplete = fields.some((field) => {
        if (!field.required) {
            return false;
        }

        const value = formData[field.name] || "";
        return value.trim() === "";
    });

    return (
        <FormCard title={title}>
            <form className="dynamic-form" onSubmit={onSubmit}>
                {fields.map((field) => (
                    <CustomInput
                        key={field.name}
                        label={field.label}
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={(event) =>
                            handleFieldChange(field.name, event.target.value)
                        }
                        placeholder={field.placeholder || ""}
                        required={field.required || false}
                        disabled={field.disabled || false}
                    />
                ))}

                <CustomButton
                    type="submit"
                    text={buttonText}
                    disabled={isFormIncomplete}
                />

                <FormMessage message={message} />
                {footer}
            </form>
        </FormCard>
    );
}

export default DynamicForm;