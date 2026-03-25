import {useEffect, useState} from "react";
import {getFollowing, getMyProfile} from "../services/feedService.js";


function useLeftSidebarData() {
    const [currentUser, setCurrentUser] = useState(null);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [isLoadingLeftSidebar, setIsLoadingLeftSidebar] = useState(false);
    const [leftSidebarError, setLeftSidebarError] = useState("");

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
            setCurrentUser(profileResponse.user || null);
            setFollowingUsers(followingResponse.following || []);
        } catch (error) {
            setLeftSidebarError("Failed to load left sidebar data");
        } finally {
            setIsLoadingLeftSidebar(false);
        }
    };

    return {
        currentUser,
        followingUsers,
        isLoadingLeftSidebar,
        leftSidebarError,
        loadLeftSidebarData,
    };
}

export default useLeftSidebarData;