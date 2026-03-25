import { useEffect, useState } from "react";
import { followUser, searchUsers, unfollowUser } from "../services/feedService.js";

function useFeedUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [pendingUserId, setPendingUserId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            if (!searchTerm.trim()) {
                setUsers([]);
                setError("");
                return;
            }
            try {
                setIsSearching(true);
                setError("");
                const result = await searchUsers(searchTerm);
                console.log(result);
                if (result.success) {
                    setUsers(result.users || []);
                } else {
                    setUsers([]);
                    setError(result.errorCode || "Search failed");
                }
            } catch (error) {
                console.error("Failed to search users", error);
                setUsers([]);
                setError("Failed to load users");
            } finally {
                setIsSearching(false);
            }
        };
        loadUsers();
    }, [searchTerm]);


    const handleFollowUser = async (selectedUser) => {
        try {
            setPendingUserId(selectedUser.id);
            setError("");
            const result = await followUser(selectedUser.id);
            if (!result.success) {
                setError(result.errorCode || "Follow failed");
                return;
            }
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, following: true }
                        : user)
            );
        } catch (error) {
            console.error("Follow failed", error);
            setError("Follow failed");
        } finally {
            setPendingUserId(null);
        }
    };


    const handleUnfollowUser = async (selectedUser) => {
        try {
            setPendingUserId(selectedUser.id);
            setError("");
            const result = await unfollowUser(selectedUser.id);
            if (!result.success) {
                setError(result.errorCode || "Unfollow failed");
                return;
            }
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, following: false }
                        : user
                )
            );
        } catch (error) {
            console.error("Unfollow failed", error);
            setError("Unfollow failed");
        } finally {
            setPendingUserId(null);
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        users,
        isSearching,
        pendingUserId,
        error,
        handleFollowUser,
        handleUnfollowUser,
    };
}

export default useFeedUsers;