import UserSearch from "../users/UserSearch.jsx";
import SearchResultsList from "../users/SearchResultsList.jsx";
import "../../styles/RightSidebar.css";

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