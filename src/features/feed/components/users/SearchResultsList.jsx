import SearchResultItem from "./SearchResultItem.jsx";
import UserList from "./UserList.jsx";

function SearchResultsList({users = [], onFollowUser, onUnfollowUser, onUserClick, pendingUserId,}) {
    return (
        <UserList
            users={users}
            emptyMessage="No users found"
            renderItem={(user) => (
                <SearchResultItem
                    user={user}
                    following={user.following}
                    onFollow={onFollowUser}
                    onUnfollow={onUnfollowUser}
                    onClick={() => onUserClick && onUserClick(user)}
                    isLoading={pendingUserId === user.id}
                />
            )}
        />
    );
}

export default SearchResultsList;