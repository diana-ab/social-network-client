import {useState} from "react";
import useFeedUsers from "./useFeedUsers.js";
import useFeedPageData from "./useFeedPageData.js";
import {
    deletePost,
    getFeedPosts,
    getMyPosts,
    getPostsByUserId,
} from "../services/feedService.js";
import {mergePostsWithoutDuplicates} from "../utils/postUtils.js";
import {FEED_PAGE_MESSAGES} from "../constants/feedMessages.js";

function useFeedBodyManager() {
    const {
        currentUser,
        setCurrentUser,
        followingUsers,
        setFollowingUsers,
        posts,
        setPosts,
        isLoadingPage,
        pageError,
    } = useFeedPageData();

    const [viewMode, setViewMode] = useState("feed");
    const [isSwitchingPosts, setIsSwitchingPosts] = useState(false);
    const [postsError, setPostsError] = useState("");
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    const loadPostsByMode = async (mode) => {
        setIsSwitchingPosts(true);
        setPostsError("");

        try {
            const response =
                mode === "my-posts"
                    ? await getMyPosts()
                    : await getFeedPosts();

            if (!response.success) {
                setPostsError(FEED_PAGE_MESSAGES.LOAD_POSTS_ERROR);
                return;
            }

            setPosts(response.posts || []);
        } catch (error) {
            setPostsError(FEED_PAGE_MESSAGES.LOAD_POSTS_ERROR);
        } finally {
            setIsSwitchingPosts(false);
        }
    };

    const handleChangeViewMode = async (mode) => {
        if (mode === viewMode) {
            return;
        }

        setViewMode(mode);
        await loadPostsByMode(mode);
    };

    const handleAskDeletePost = (postId) => {
        setPostIdToDelete(postId);
    };

    const handleCloseDeleteModal = () => {
        setPostIdToDelete(null);
    };

    const handleConfirmDeletePost = async () => {
        if (!postIdToDelete) {
            return;
        }

        setPostsError("");

        try {
            const response = await deletePost(postIdToDelete);

            if (!response.success) {
                setPostsError(FEED_PAGE_MESSAGES.DELETE_POST_ERROR);
                return;
            }

            setPosts((previousPosts) =>
                previousPosts.filter((post) => post.id !== postIdToDelete)
            );

            setPostIdToDelete(null);
        } catch (error) {
            setPostsError(FEED_PAGE_MESSAGES.DELETE_POST_ERROR);
        }
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

            if (viewMode !== "feed") {
                return;
            }

            try {
                const response = await getPostsByUserId(selectedUser.id);
                const newPosts = response.posts || [];

                setPosts((previousPosts) =>
                    mergePostsWithoutDuplicates(previousPosts, newPosts)
                );
            } catch (error) {
                console.error(FEED_PAGE_MESSAGES.LOAD_FOLLOWED_USER_POSTS_ERROR, error);
            }
        },

        onUnfollowSuccess: (selectedUser) => {
            setFollowingUsers((previousUsers) =>
                previousUsers.filter((user) => user.id !== selectedUser.id)
            );

            if (viewMode !== "feed") {
                return;
            }

            setPosts((previousPosts) =>
                previousPosts.filter((post) => post.userId !== selectedUser.id)
            );
        },
    });

    return {currentUser, setCurrentUser, followingUsers, posts, setPosts,isLoadingPage, pageError, viewMode, isSwitchingPosts, postsError, postIdToDelete,
        handleChangeViewMode, handleAskDeletePost, handleCloseDeleteModal, handleConfirmDeletePost, searchTerm,
        setSearchTerm, users, isSearching, pendingUserId, errorMessage, handleFollowUser, handleUnfollowUser,

    };
}

export default useFeedBodyManager;