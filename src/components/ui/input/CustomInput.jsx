import "./CustomInput.css";

function CustomInput({
                         label,
                         type = "text",
                         name,
                         value,
                         onChange,
                         placeholder = "",
                         required = false,
                         disabled = false
                     }) {
    return (
        <div className="custom-input-wrapper">
            {label && (
                <label className="custom-input-label" htmlFor={name}>
                    {label}
                </label>
            )}

            <input
                className="custom-input"
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