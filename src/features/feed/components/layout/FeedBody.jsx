import "../../styles/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../hooks/useFeedUsers.js";
import useFeedManager from "../../hooks/useFeedManager.js";

function FeedBody() {
    const {postsRefreshKey, followingRefreshKey, refreshFeedRelations,} = useFeedManager();
    const {searchTerm, setSearchTerm, users, isSearching, pendingUserId, errorMessage, handleFollowUser, handleUnfollowUser,} = useFeedUsers(refreshFeedRelations);

    return (
        <div className="feed-body">
            <LeftSidebar refreshKey={followingRefreshKey} />

            <FeedMain refreshKey={postsRefreshKey} />

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