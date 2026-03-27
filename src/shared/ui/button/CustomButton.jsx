import "./CustomButton.css";

function CustomButton({
                          text,
                          children,
                          type = "button",
                          onClick,
                          disabled = false,
                          variant = "primary",
                          size = "medium",
                          fullWidth = true,
                          className = "",
                      }) {
    const buttonClassName = [
        "custom-button",
        `custom-button--${variant}`,
        `custom-button--${size}`,
        fullWidth ? "custom-button--full-width" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClassName}
        >
            {children || text}
        </button>
    );
}

export default CustomButton;