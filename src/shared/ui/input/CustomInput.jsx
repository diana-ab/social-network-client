import "./CustomInput.css";

function CustomInput({
                         label,
                         type = "text",
                         name,
                         value,
                         onChange,
                         placeholder = "",
                         required = false,
                         disabled = false,
                         className = "",
                         wrapperClassName = "",
                         inputClassName = "",
                         fullWidth = true,
                     }) {
    const wrapperClasses = [
        "custom-input-wrapper",
        fullWidth ? "custom-input-wrapper--full-width" : "",
        wrapperClassName,
    ]
        .filter(Boolean)
        .join(" ");

    const inputClasses = [
        "custom-input",
        inputClassName,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={wrapperClasses}>
            {label && (
                <label className="custom-input-label" htmlFor={name}>
                    {label}
                </label>
            )}

            <input
                className={inputClasses}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
        </div>
    );
}

export default CustomInput;