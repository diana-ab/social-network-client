import { useEffect, useState } from "react";
import { followUser, searchUsers, unfollowUser } from "../services/feedService.js";
import useErrorMessage from "../../../shared/hooks/useErrorMessage.js";

function useFeedUsers(onFollowChanged) {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [pendingUserId, setPendingUserId] = useState(null);

    const {
        errorMessage,
        clearErrorMessage,
        setErrorMessageFromApiError,
    } = useErrorMessage();

    useEffect(() => {
        const loadUsers = async () => {
            if (!searchTerm.trim()) {
                setUsers([]);
                clearErrorMessage();
                return;
            }

            try {
                setIsSearching(true);
                clearErrorMessage();

                const result = await searchUsers(searchTerm);
                setUsers(result.users || []);
            } catch (error) {
                setUsers([]);
                setErrorMessageFromApiError(error);
            } finally {
                setIsSearching(false);
            }
        };

        loadUsers();
    }, [searchTerm]);

    const handleFollowUser = async (selectedUser) => {
        try {
            setPendingUserId(selectedUser.id);
            clearErrorMessage();

            await followUser(selectedUser.id);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, following: true }
                        : user
                )
            );

            if (onFollowChanged) {
                onFollowChanged();
            }
        } catch (error) {
            setErrorMessageFromApiError(error);
        } finally {
            setPendingUserId(null);
        }
    };

    const handleUnfollowUser = async (selectedUser) => {
        try {
            setPendingUserId(selectedUser.id);
            clearErrorMessage();

            await unfollowUser(selectedUser.id);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, following: false }
                        : user
                )
            );

            if (onFollowChanged) {
                onFollowChanged();
            }
        } catch (error) {
            setErrorMessageFromApiError(error);
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
        errorMessage,
        handleFollowUser,
        handleUnfollowUser,
    };
}

export default useFeedUsers;