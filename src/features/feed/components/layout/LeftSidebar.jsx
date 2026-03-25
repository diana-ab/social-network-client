
import ProfileCard from "../users/ProfileCard.jsx";
import FollowingList from "../users/FollowingList.jsx";
import useLeftSidebarData from "../../hooks/useLeftSidebarData.js";

function LeftSidebar() {
    const {currentUser, followingUsers, isLoadingLeftSidebar, leftSidebarError, isUpdatingProfileImage,
        updateProfileImageError, handleUpdateProfileImage, clearUpdateProfileImageError,} = useLeftSidebarData();

    if (isLoadingLeftSidebar) {
        return (
            <aside className="left-sidebar">
                <p>Loading left sidebar...</p>
            </aside>
        );
    }
    if (leftSidebarError) {
        return (
            <aside className="left-sidebar">
                <p>{leftSidebarError}</p>
            </aside>);}

    return (
        <aside className="left-sidebar">
            <ProfileCard
                user={currentUser}
                isUpdatingProfileImage={isUpdatingProfileImage}
                updateProfileImageError={updateProfileImageError}
                onSaveProfileImage={handleUpdateProfileImage}
                onClearProfileImageError={clearUpdateProfileImageError}
            />

            <div className="left-sidebar__following-title">
                Following List
            </div>

            <FollowingList users={followingUsers} />
        </aside>
    );
}

export default LeftSidebar;