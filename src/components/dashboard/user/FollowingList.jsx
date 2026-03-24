import FollowingItem from "./FollowingItem.jsx";

function FollowingList ( {users= [] , onClickOnUser} ) {

    if (!users.length){
        return (
            <div className="following-list__empty">
                No following users affter you
            </div>
        );
    }

    return (<div className="following-list">{
        users.map((user)=>(
            <FollowingItem
                key = {user.id || user.username}
                user={user}
                onClick={onClickOnUser&& onClickOnUser(user)}/>
            ))
        }
    </div>)
}
export default FollowingList;