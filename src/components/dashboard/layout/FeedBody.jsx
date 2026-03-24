import useFeedUsers from "../../../hooks/useFeedUsers.js";
import RightSidebar from "./RightSidebar.jsx";


function FeedBody() {
    const {searchTerm, setSearchTerm, filteredUsers, handleFollowUser,
        handleUnfollowUser} = useFeedUsers();

    return (
        <div>
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