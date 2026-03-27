import "../../styles/CreatePostBox.css"
import CustomButton from "../../../../shared/ui/button/CustomButton.jsx";

function CreatePostBox({value, onChange, onSubmit, isLoading = false,}) {
    return (
        <div className="create-post-box">
            <textarea
                className="create-post-box__textarea"
                value={value}
                onChange={onChange}
                placeholder="What do you want to share?"
                rows={5}
                disabled={isLoading}
            />

            <div className="create-post-box__actions">
                <CustomButton
                    text={isLoading ? "Publishing..." : "Publish Post"}
                    onClick={onSubmit}
                    disabled={isLoading || !value.trim()}
                    fullWidth={false}
                />
            </div>
        </div>
    );
}

export default CreatePostBox;