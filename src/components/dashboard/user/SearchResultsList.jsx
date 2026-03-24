import SearchResultItem from "./SearchResultItem";
import UserList from "./ui_user/UserList.jsx";

function SearchResultsList({users = [], onFollowUser, onUnfollowUser,
                               onUserClick  }) {

    return (
        <UserList
            users={users}
            emptyMessage="No users found"
            renderItem={(user) => (
                <SearchResultItem user={user}
                    isFollowing={user.isFollowing}
                    onFollow={onFollowUser}
                    onUnfollow={onUnfollowUser}
                    onClick={() => onUserClick && onUserClick(user)}/>
            )}/>
    );
}

export default SearchResultsList;