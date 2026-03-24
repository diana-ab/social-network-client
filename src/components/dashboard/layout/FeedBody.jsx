
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../../hooks/useFeedUsers.js";


function FeedBody() {
    const {searchTerm, setSearchTerm, filteredUsers, handleFollowUser,
        handleUnfollowUser} = useFeedUsers();

    return (
        <div className="feed-body">
            <LeftSidebar />
            <FeedMain />
            <RightSidebar
                searchTerm={searchTerm}
                onSearchChange={(event) => setSearchTerm(event.target.value)}
                users={filteredUsers}
                onFollowUser={handleFollowUser}
                onUnfollowUser={handleUnfollowUser}
            />
        </div>
    );
}

export default FeedBody;