import { useState } from "react";
import { updateProfileImage } from "../services/feedService.js";
import { FEED_PROFILE_MESSAGES } from "../constants/feedMessages.js";

function useProfileImageUpdater({ setCurrentUser }) {
    const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState(false);
    const [updateProfileImageError, setUpdateProfileImageError] = useState("");

    const handleUpdateProfileImage = async (profileImageUrl) => {
        const trimmedProfileImageUrl = profileImageUrl.trim();

        if (!trimmedProfileImageUrl) {
            setUpdateProfileImageError(FEED_PROFILE_MESSAGES.EMPTY_PROFILE_IMAGE_URL);
            return false;
        }

        setIsUpdatingProfileImage(true);
        setUpdateProfileImageError("");

        try {
            const response = await updateProfileImage(trimmedProfileImageUrl);

            if (!response.success) {
                setUpdateProfileImageError(FEED_PROFILE_MESSAGES.UPDATE_PROFILE_IMAGE_ERROR);
                return false;
            }

            setCurrentUser((previousUser) => {
                if (!previousUser) {
                    return previousUser;
                }

                return {
                    ...previousUser,
                    profilePicture: trimmedProfileImageUrl,
                };
            });

            return true;
        } catch (error) {
            setUpdateProfileImageError(FEED_PROFILE_MESSAGES.UPDATE_PROFILE_IMAGE_ERROR);
            return false;
        } finally {
            setIsUpdatingProfileImage(false);
        }
    };

    const clearUpdateProfileImageError = () => {
        setUpdateProfileImageError("");
    };

    return {
        isUpdatingProfileImage,
        updateProfileImageError,
        handleUpdateProfileImage,
        clearUpdateProfileImageError,
    };
}

export default useProfileImageUpdater;