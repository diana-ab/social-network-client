import FollowingItem from "./FollowingItem.jsx";
import UserList from "./UserList.jsx";


function FollowingList({users = [], onClickOnUser}) {
    return (
        <UserList
            users={users}
            emptyMessage="No following users"
            renderItem={(user) => (
                <FollowingItem
                    user={user}
                    onClick={() => onClickOnUser && onClickOnUser(user)}/>
            )}/>
    )
}

export default FollowingList;