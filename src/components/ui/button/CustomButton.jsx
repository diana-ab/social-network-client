import "./CustomButton.css";

function CustomButton({
                          text,
                          type = "button",
                          onClick,
                          disabled = false,
                      }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="custom-button"
        >
            {text}
        </button>
    );
}

export default CustomButton;