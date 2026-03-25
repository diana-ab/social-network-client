import UserSearch from "../user/UserSearch.jsx";
import SearchResultsList from "../user/SearchResultsList.jsx";
import "./style_layout/RightSidebar.css";

function RightSidebar({searchTerm, onSearchChange, users,
                          onFollowUser, onUnfollowUser,isLoading, error,}) {

    return (
        <aside className="right-sidebar">
            <div className="right-sidebar__search">
                <UserSearch value={searchTerm}
                    onChange={onSearchChange}/>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="right-sidebar__results">
                <SearchResultsList users={users}
                    onFollowUser={onFollowUser}
                    onUnfollowUser={onUnfollowUser}/>

            </div>
        </aside>
    );
}

export default RightSidebar;