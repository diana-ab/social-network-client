
import UserList from './UserList';
import SearchResultItem from "./SearchResultItem";

function SearchResultsList({ users = [], onFollowUser, onUserClick }) {
    return (
        <UserList
            users={users}
            emptyMessage="No users found"
            renderItem={(user) => (
                <SearchResultItem
                    user={user}
                    onFollow={onFollowUser}
                    onClick={() => onUserClick && onUserClick(user)}
                />
            )}
        />
    );
}

export default SearchResultsList;