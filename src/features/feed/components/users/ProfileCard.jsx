import ProfileCardBase from "./ProfileCardBase.jsx";
import CustomButton from "../../../../shared/ui/button/CustomButton.jsx";
import CustomInput from "../../../../shared/ui/input/CustomInput.jsx";
import {useState} from "react";
import "../../styles/ProfileCard.css";

function ProfileCard({
                         user, onClick, isUpdatingProfileImage = false, updateProfileImageError = "",
                         onSaveProfileImage, onClearProfileImageError,
                     }) {

    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [profileImageUrlInput, setProfileImageUrlInput] = useState("");

    const handleOpenImageEditor = () => {
        setProfileImageUrlInput(user?.profilePicture || user?.profileImage || "");
        onClearProfileImageError?.();
        setIsImageEditorOpen(true);
    };

    const handleCloseImageEditor = () => {
        setProfileImageUrlInput("");
        onClearProfileImageError?.();
        setIsImageEditorOpen(false);
    };

    const handleSave = async () => {
        const success = await onSaveProfileImage?.(profileImageUrlInput);

        if (success) {
            setIsImageEditorOpen(false);
        }
    };

    return (
        <div className="profile-card">
            <ProfileCardBase
                user={user}
                onClick={onClick}
                className="profile-card__user-card"
            />

            <div className="profile-card__actions">
                <CustomButton
                    text={isImageEditorOpen ? "Close image editor" : "Edit profile image"}
                    onClick={isImageEditorOpen ? handleCloseImageEditor : handleOpenImageEditor}
                    variant="secondary"
                    size="small"
                    fullWidth={false}
                />
            </div>

            {isImageEditorOpen && (
                <div className="profile-card__image-editor">
                    <CustomInput
                        name="profileImageUrl"
                        value={profileImageUrlInput}
                        onChange={(event) => setProfileImageUrlInput(event.target.value)}
                        placeholder="Enter profile image URL"
                        disabled={isUpdatingProfileImage}
                        fullWidth={true}
                    />

                    <div className="profile-card__image-editor-actions">
                        <CustomButton
                            text={isUpdatingProfileImage ? "Saving..." : "Save"}
                            onClick={handleSave}
                            disabled={isUpdatingProfileImage}
                            variant="primary"
                            size="small"
                            fullWidth={false}
                        />

                        <CustomButton
                            text="Cancel"
                            onClick={handleCloseImageEditor}
                            disabled={isUpdatingProfileImage}
                            variant="ghost"
                            size="small"
                            fullWidth={false}
                        />
                    </div>

                    {updateProfileImageError && (
                        <p className="profile-card__error">
                            {updateProfileImageError}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileCard;