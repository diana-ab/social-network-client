import UserCardBase from "./UserCardBase.jsx";

function FollowingItem({user, onClick}) {
    return (
        <UserCardBase
            user={user}
            onClick={onClick}/>);
}

export default FollowingItem;