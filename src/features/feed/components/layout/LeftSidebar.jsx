import ProfileCard from "../users/ProfileCard.jsx";
import FollowingList from "../users/FollowingList.jsx";

function LeftSidebar() {
    const currentUser = {
        id: 1,
        username: "shimon",
        profileImage: "",
    };

    const followingUsers = [
        { id: 2, username: "diana", profileImage: "" },
        { id: 3, username: "kloy", profileImage: "" },
        { id: 4, username: "shimon2", profileImage: "" },
    ];

    const handleUserClick = (user) => {
        console.log("Clicked user:", user);
    };

    return (
        <aside className="left-sidebar">
            <ProfileCard
                user={currentUser}
                onClick={() => handleUserClick(currentUser)}/>

            <section className="left-sidebar__following-section">
                <h3 className="left-sidebar__title">Following</h3>
                <FollowingList users={followingUsers}
                    onClickOnUser={handleUserClick}/>
            </section>
        </aside>
    );
}

export default LeftSidebar;