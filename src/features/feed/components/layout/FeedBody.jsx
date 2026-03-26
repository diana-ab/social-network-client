import { useEffect, useState } from "react";
import "../../styles/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../hooks/useFeedUsers.js";
import {
    getFeedPosts,
    getFollowing,
    getMyProfile,
    getPostsByUserId,
} from "../../services/feedService.js";

function FeedBody() {
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
                setPageError("Failed to load profile");
                return;
            }

            if (!followingResponse.success) {
                setPageError("Failed to load following users");
                return;
            }

            if (!feedResponse.success) {
                setPageError("Failed to load posts");
                return;
            }

            setCurrentUser(profileResponse || null);
            setFollowingUsers(followingResponse.followingUsers || []);
            setPosts(feedResponse.posts || []);
        } catch (error) {
            setPageError("Failed to load feed page");
        } finally {
            setIsLoadingPage(false);
        }
    };

    const mergePostsWithoutDuplicates = (oldPosts, newPosts) => {
        const merged = [...newPosts, ...oldPosts];

        const uniquePosts = merged.filter((post, index, array) => {
            return index === array.findIndex((currentPost) => currentPost.id === post.id);
        });

        return uniquePosts
            .sort((firstPost, secondPost) => new Date(secondPost.createdAt) - new Date(firstPost.createdAt))
            .slice(0, 20);
    };

    const {
        searchTerm,
        setSearchTerm,
        users,
        isSearching,
        pendingUserId,
        errorMessage,
        handleFollowUser,
        handleUnfollowUser,
    } = useFeedUsers({
        onFollowSuccess: async (selectedUser) => {
            setFollowingUsers((previousUsers) => {
                const alreadyExists = previousUsers.some((user) => user.id === selectedUser.id);
                if (alreadyExists) {
                    return previousUsers;
                }
                return [selectedUser, ...previousUsers];
            });

            try {
                const response = await getPostsByUserId(selectedUser.id);
                const newPosts = response.posts || [];

                setPosts((previousPosts) =>
                    mergePostsWithoutDuplicates(previousPosts, newPosts)
                );
            } catch (error) {
                console.error("Failed to load followed user posts", error);
            }
        },

        onUnfollowSuccess: (selectedUser) => {
            setFollowingUsers((previousUsers) =>
                previousUsers.filter((user) => user.id !== selectedUser.id)
            );

            setPosts((previousPosts) =>
                previousPosts.filter((post) => post.userId !== selectedUser.id)
            );
        },
    });

    if (isLoadingPage) {
        return <div className="feed-body">Loading feed...</div>;
    }

    if (pageError) {
        return <div className="feed-body">{pageError}</div>;
    }

    return (
        <div className="feed-body">
            <LeftSidebar
                currentUser={currentUser}
                followingUsers={followingUsers}
                setCurrentUser={setCurrentUser}
            />

            <FeedMain
                posts={posts}
                setPosts={setPosts}
                currentUser={currentUser}
            />

            <RightSidebar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                users={users}
                onFollowUser={handleFollowUser}
                onUnfollowUser={handleUnfollowUser}
                isSearching={isSearching}
                pendingUserId={pendingUserId}
                error={errorMessage}
            />
        </div>
    );
}

export default FeedBody;