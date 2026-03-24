import "../style_user/UserList.css";

function UserList({ users = [], renderItem, emptyMessage = "No users found" }) {
    if (!users.length) {
        return (
            <div className="user-list__empty">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="user-list">
            {users.map((user) => (
                <div key={user.id || user.username}>
                    {renderItem(user)}
                </div>
            ))}
        </div>
    );
}

export default UserList;