import { useEffect, useState } from "react";
import {
    getFollowing,
    getMyProfile,
    updateProfileImage,
} from "../services/feedService.js";

function useLeftSidebarData() {
    const [currentUser, setCurrentUser] = useState(null);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [isLoadingLeftSidebar, setIsLoadingLeftSidebar] = useState(false);
    const [leftSidebarError, setLeftSidebarError] = useState("");
    const [isUpdatingProfileImage, setIsUpdatingProfileImage] = useState(false);
    const [updateProfileImageError, setUpdateProfileImageError] = useState("");

    useEffect(() => {
        loadLeftSidebarData();
    }, []);
    const loadLeftSidebarData = async () => {
        setIsLoadingLeftSidebar(true);
        setLeftSidebarError("");
        try {
            const [profileResponse, followingResponse] = await Promise.all([
                getMyProfile(),
                getFollowing(),
            ]);
            if (!profileResponse.success) {
                setLeftSidebarError("Failed to load profile");
                return;
            }
            if (!followingResponse.success) {
                setLeftSidebarError("Failed to load following users");
                return;
            }
            setCurrentUser(profileResponse || null);
            setFollowingUsers(followingResponse.followingUsers || []);
        } catch (error) {
            setLeftSidebarError("Failed to load left sidebar data");
        } finally {
            setIsLoadingLeftSidebar(false);
        }
    };


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
                return {...previousUser, profilePicture: trimmedProfileImageUrl,};
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

    return {
        currentUser,
        followingUsers,
        isLoadingLeftSidebar,
        leftSidebarError,
        isUpdatingProfileImage,
        updateProfileImageError,
        loadLeftSidebarData,
        handleUpdateProfileImage,
        clearUpdateProfileImageError,
    };
}

export default useLeftSidebarData;