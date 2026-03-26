import "../../styles/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../hooks/useFeedUsers.js";
import useFeedPageData from "../../hooks/useFeedPageData.js";
import { getPostsByUserId } from "../../services/feedService.js";
import { mergePostsWithoutDuplicates } from "../../utils/postUtils.js";
import { FEED_PAGE_MESSAGES } from "../../constants/feedMessages.js";

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
                console.error(FEED_PAGE_MESSAGES.LOAD_FOLLOWED_USER_POSTS_ERROR, error);
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
        </div>
    );
}

export default FeedBody;