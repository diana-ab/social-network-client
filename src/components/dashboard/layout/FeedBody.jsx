import "./style_layout/FeedBody.css";
import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import FeedMain from "./FeedMain.jsx";
import useFeedUsers from "../../../hooks/useFeedUsers.js";


function FeedBody() {
    const {searchTerm,
        setSearchTerm, users, handleFollowUser, handleUnfollowUser, isLoading, error,} = useFeedUsers();

    return (
        <div className="feed-body">
            <LeftSidebar />
            <FeedMain />
            <RightSidebar
                searchTerm={searchTerm}
                onSearchChange={(event) => setSearchTerm(event.target.value)}
                users={users}
                onFollowUser={handleFollowUser}
                onUnfollowUser={handleUnfollowUser}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}

export default FeedBody;