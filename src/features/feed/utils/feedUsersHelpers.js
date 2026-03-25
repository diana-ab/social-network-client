export function followUserInList(users, selectedUser) {
    return users.map((user) =>
        user.id === selectedUser.id
            ? { ...user, isFollowing: true }
            : user
    );
}

export function unfollowUserInList(users, selectedUser) {
    return users.map((user) =>
        user.id === selectedUser.id
            ? { ...user, isFollowing: false }
            : user
    );
}