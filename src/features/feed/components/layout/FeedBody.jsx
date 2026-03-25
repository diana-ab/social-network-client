import "../../styles/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../hooks/useFeedUsers.js";


function FeedBody() {
    const {searchTerm, setSearchTerm, users, isSearching, pendingUserId,
        error, handleFollowUser, handleUnfollowUser,} = useFeedUsers();

    return (
        <div className="feed-body">
            <LeftSidebar/>

            <FeedMain />
            <RightSidebar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                users={users}
                onFollowUser={handleFollowUser}
                onUnfollowUser={handleUnfollowUser}
                isSearching={isSearching}
                pendingUserId={pendingUserId}
                error={error}
            />
        </div>
    );
}

export default FeedBody;