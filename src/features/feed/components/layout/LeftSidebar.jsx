import ProfileCard from "../users/ProfileCard.jsx";
import FollowingList from "../users/FollowingList.jsx";
import useProfileImageUpdater from "../../hooks/useProfileImageUpdater.js";
import "../../styles/LeftSidebar.css";

function LeftSidebar({currentUser, followingUsers, setCurrentUser}) {
    const {
        isUpdatingProfileImage,
        updateProfileImageError,
        handleUpdateProfileImage,
        clearUpdateProfileImageError,
    } = useProfileImageUpdater({setCurrentUser});

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
                Following
            </div>

            <div
                className="left-sidebar__following-list"
                role="region"
                aria-label="Following list"
            >
                <FollowingList users={followingUsers}/>
            </div>
        </aside>
    );
}

export default LeftSidebar;