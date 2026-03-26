import { useState } from "react";
import ProfileCard from "../users/ProfileCard.jsx";
import FollowingList from "../users/FollowingList.jsx";
import { updateProfileImage } from "../../services/feedService.js";
import "../../styles/LeftSidebar.css";

function LeftSidebar({ currentUser, followingUsers, setCurrentUser }) {
    const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState(false);
    const [updateProfileImageError, setUpdateProfileImageError] = useState("");

    const handleUpdateProfileImage = async (profileImageUrl) => {
        const trimmedProfileImageUrl = profileImageUrl.trim();

        if (!trimmedProfileImageUrl) {
            setUpdateProfileImageError("Profile image URL cannot be empty");
            return false;
        }

        setIsUpdatingProfileImage(true);
        setUpdateProfileImageError("");

        try {
            const response = await updateProfileImage(trimmedProfileImageUrl);

            if (!response.success) {
                setUpdateProfileImageError("Failed to update profile image");
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
            setUpdateProfileImageError("Failed to update profile image");
            return false;
        } finally {
            setIsUpdatingProfileImage(false);
        }
    };

    const clearUpdateProfileImageError = () => {
        setUpdateProfileImageError("");
    };

    return (
        <aside className="left-sidebar">
            <ProfileCard
                user={currentUser}
                isUpdatingProfileImage={isUpdatingProfileImage}
                updateProfileImageError={updateProfileImageError}
                onSaveProfileImage={handleUpdateProfileImage}
                onClearProfileImageError={clearUpdateProfileImageError}
            />

            <div className="left-sidebar__following-title">Following</div>

            <div className="left-sidebar__following-list" role="region" aria-label="Following list">
                <FollowingList users={followingUsers} />
            </div>
        </aside>
    );
}

export default LeftSidebar;