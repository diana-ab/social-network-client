import ProfileCard from "../users/ProfileCard.jsx";
import FollowingList from "../users/FollowingList.jsx";
import useLeftSidebarData from "../../hooks/useLeftSidebarData.js";
import "../../styles/LeftSidebar.css";

function LeftSidebar({ refreshKey }) {
    const {currentUser, followingUsers, isLoadingLeftSidebar, leftSidebarError, isUpdatingProfileImage, updateProfileImageError, handleUpdateProfileImage, clearUpdateProfileImageError,} = useLeftSidebarData(refreshKey);

    if (isLoadingLeftSidebar) {
        return (
            <aside className="left-sidebar">
                <p className="left-sidebar__hint">Loading left sidebar...</p>
            </aside>
        );
    }

    if (leftSidebarError) {
        return (
            <aside className="left-sidebar">
                <p className="left-sidebar__error">{leftSidebarError}</p>
            </aside>
        );
    }

    return (
        <aside className="left-sidebar">
            <ProfileCard
                user={currentUser}
                isUpdatingProfileImage={isUpdatingProfileImage}
                updateProfileImageError={updateProfileImageError}
                onSaveProfileImage={handleUpdateProfileImage}
                onClearProfileImageError={clearUpdateProfileImageError}
            />

            <div className="left-sidebar__following-title">Following</div>

            <div className="left-sidebar__following-list" role="region" aria-label="Following list">
                <FollowingList users={followingUsers} />
            </div>
        </aside>
    );
}

export default LeftSidebar;