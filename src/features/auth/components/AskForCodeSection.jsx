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