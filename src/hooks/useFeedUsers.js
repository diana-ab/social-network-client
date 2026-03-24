import {useEffect, useState} from "react";

function useFeedUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            if (!searchTerm.trim()) {
                setUsers([]);
                return;
            }

            try {
                setIsLoading(true);
                setError("");

                // כאן בהמשך תהיה קריאת שרת אמיתית
                // const data = await searchUsers(searchTerm);
                // setUsers(data);

            } catch (error) {
                console.error("Failed to search users", error);
                setError("Failed to load users");
            } finally {
                setIsLoading(false);
            }
        };
        loadUsers();
    }, [searchTerm]);

    const handleFollowUser = async (selectedUser) => {
        try {
            // await followUser(selectedUser.id);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? {...user, isFollowing: true} : user
                )
            );
        } catch (error) {
            console.error("Follow failed", error);
            setError("Follow failed");
        }
    };

    const handleUnfollowUser = async (selectedUser) => {
        try {
            // await unfollowUser(selectedUser.id);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? {...user, isFollowing: false} : user
                )
            );
        } catch (error) {
            console.error("Unfollow failed", error);
            setError("Unfollow failed");
        }
    };

    // const filteredUsers = users.filter((user) =>
    //     user.username.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return {
        searchTerm,
        setSearchTerm,
        users,
        isLoading,
        error,
        handleFollowUser,
        handleUnfollowUser,
    };
}

export default useFeedUsers;