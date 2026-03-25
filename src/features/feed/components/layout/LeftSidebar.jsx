import ProfileCard from "../users/ProfileCard.jsx";
import FollowingList from "../users/FollowingList.jsx";
import useLeftSidebarData from "../../hooks/useLeftSidebarData.js";

function LeftSidebar() {
    const {
        currentUser,
        followingUsers,
        isLoadingLeftSidebar,
        leftSidebarError,
    } = useLeftSidebarData();

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
            </aside>
        );
    }

    return (
        <aside className="left-sidebar">
            <ProfileCard user={currentUser} />
            <FollowingList users={followingUsers} />
        </aside>
    );
}

export default LeftSidebar;