import { useState } from "react";

function useFeedManager() {
    const [postsRefreshKey, setPostsRefreshKey] = useState(0);
    const [followingRefreshKey, setFollowingRefreshKey] = useState(0);

    const refreshPosts = () => {
        setPostsRefreshKey((prev) => prev + 1);
    };

    const refreshFollowingUsers = () => {
        setFollowingRefreshKey((prev) => prev + 1);
    };

    const refreshFeedRelations = () => {
        refreshPosts();
        refreshFollowingUsers();
    };

    return {
        postsRefreshKey,
        followingRefreshKey,
        refreshPosts,
        refreshFollowingUsers,
        refreshFeedRelations,
    };
}

export default useFeedManager;