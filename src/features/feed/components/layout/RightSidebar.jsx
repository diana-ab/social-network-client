import UserSearch from "../users/UserSearch.jsx";
import SearchResultsList from "../users/SearchResultsList.jsx";
import "../../styles/RightSidebar.css";

function RightSidebar({
                          searchTerm,
                          onSearchChange,
                          users,
                          onFollowUser,
                          onUnfollowUser,
                          isSearching,
                          pendingUserId,
                          error,
                      }) {
    const hasSearchTerm = searchTerm.trim().length > 0;

    return (
        <aside className="right-sidebar">
            <div className="right-sidebar__top">
                <div className="right-sidebar__title">Find Citizens</div>
                <div className="right-sidebar__search">
                    <UserSearch value={searchTerm} onChange={onSearchChange}/>
                </div>
            </div>
            <div className="right-sidebar__results" role="region" aria-label="User search results">
                {!hasSearchTerm && <p className="right-sidebar__hint">Start typing to search users</p>}
                {hasSearchTerm && isSearching && <p className="right-sidebar__hint">Loading...</p>}
                {hasSearchTerm && error && <p className="right-sidebar__error">{error}</p>}

                {hasSearchTerm && !isSearching && !error && (
                    <SearchResultsList
                        users={users}
                        onFollowUser={onFollowUser}
                        onUnfollowUser={onUnfollowUser}
                        pendingUserId={pendingUserId}
                    />
                )}
            </div>
        </aside>
    );
}

export default RightSidebar;