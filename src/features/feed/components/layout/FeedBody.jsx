import {useState} from "react";
import "../../styles/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../hooks/useFeedUsers.js";
import useFeedPageData from "../../hooks/useFeedPageData.js";
import {
    deletePost,
    getFeedPosts,
    getMyPosts,
    getPostsByUserId,
} from "../../services/feedService.js";
import {mergePostsWithoutDuplicates} from "../../utils/postUtils.js";
import {FEED_PAGE_MESSAGES} from "../../constants/feedMessages.js";
import DeletePostModal from "../posts/DeletePostModal.jsx";


function FeedBody() {
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

    if (isLoadingPage) {
        return <div className="feed-body">{FEED_PAGE_MESSAGES.LOADING_FEED}</div>;
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
                viewMode={viewMode}
                onChangeViewMode={handleChangeViewMode}
                onDeletePost={handleAskDeletePost}
                isSwitchingPosts={isSwitchingPosts}
                postsError={postsError}
            />

            <RightSidebar
                searchTerm={searchTerm}
                onSearchChange={(event) => setSearchTerm(event.target.value)}
                users={users}
                onFollowUser={handleFollowUser}
                onUnfollowUser={handleUnfollowUser}
                isSearching={isSearching}
                pendingUserId={pendingUserId}
                error={errorMessage}
            />
            <DeletePostModal
                isOpen={Boolean(postIdToDelete)}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDeletePost}
            />
        </div>
    );
}

export default FeedBody;