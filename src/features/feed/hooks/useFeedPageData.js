import { useEffect, useState } from "react";
import {
    getFeedPosts,
    getFollowing,
    getMyProfile,
} from "../services/feedService.js";
import { FEED_PAGE_MESSAGES } from "../constants/feedMessages.js";

function useFeedPageData() {
    const [currentUser, setCurrentUser] = useState(null);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [pageError, setPageError] = useState("");

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        setIsLoadingPage(true);
        setPageError("");

        try {
            const [profileResponse, followingResponse, feedResponse] = await Promise.all([
                getMyProfile(),
                getFollowing(),
                getFeedPosts(),
            ]);

            if (!profileResponse.success) {
                setPageError(FEED_PAGE_MESSAGES.LOAD_PROFILE_ERROR);
                return;
            }

            if (!followingResponse.success) {
                setPageError(FEED_PAGE_MESSAGES.LOAD_FOLLOWING_ERROR);
                return;
            }

            if (!feedResponse.success) {
                setPageError(FEED_PAGE_MESSAGES.LOAD_POSTS_ERROR);
                return;
            }

            setCurrentUser(profileResponse || null);
            setFollowingUsers(followingResponse.followingUsers || []);
            setPosts(feedResponse.posts || []);
        } catch (error) {
            setPageError(FEED_PAGE_MESSAGES.LOAD_PAGE_ERROR);
        } finally {
            setIsLoadingPage(false);
        }
    };

    return {
        currentUser,
        setCurrentUser,
        followingUsers,
        setFollowingUsers,
        posts,
        setPosts,
        isLoadingPage,
        pageError,
    };
}

export default useFeedPageData;