

import "../../styles/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import DeletePostModal from "../posts/DeletePostModal.jsx";
import useFeedBodyManager from "../../hooks/useFeedBodyManager.js";
import {FEED_PAGE_MESSAGES} from "../../constants/feedMessages.js";

function FeedBody() {
    const {
        currentUser,
        setCurrentUser,
        followingUsers,
        posts,
        setPosts,
        isLoadingPage,
        pageError,
        viewMode,
        isSwitchingPosts,
        postsError,
        postIdToDelete,
        handleChangeViewMode,
        handleAskDeletePost,
        handleCloseDeleteModal,
        handleConfirmDeletePost,
        searchTerm,
        setSearchTerm,
        users,
        isSearching,
        pendingUserId,
        errorMessage,
        handleFollowUser,
        handleUnfollowUser,
    } = useFeedBodyManager();

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