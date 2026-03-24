import UserSearch from "../user/UserSearch.jsx";
import SearchResultsList from "../user/SearchResultsList.jsx";


function RightSidebar({searchTerm, onSearchChange, users, onFollowUser,
                          onUnfollowUser}) {



    return (
        <aside className="right-sidebar">
            <div className="right-sidebar__search">
                <UserSearch
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </div>

            <div className="right-sidebar__results">
                <SearchResultsList
                    users={users}
                    onFollowUser={onFollowUser}
                    onUnfollowUser={onUnfollowUser}
                />
            </div>
        </aside>
    );
}

export default RightSidebar;