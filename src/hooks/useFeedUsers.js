import {useState} from "react";
import {followUserInList, unfollowUserInList} from "../utils/feedUsersHelpers.js";


function useFeedUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const mockUsers = [
        { id: 1, username: "shimon", isFollowing: true },
        { id: 2, username: "shimon2", isFollowing: true },
        { id: 3, username: "shimon3", isFollowing: true },
        { id: 4, username: "shim", isFollowing: true },
        { id: 5, username: "shi", isFollowing: true },
        { id: 6, username: "diana", isFollowing: true },
        { id: 7, username: "kloy", isFollowing: false },
    ];

    const [users, setUsers] = useState([...mockUsers]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFollowUser = async (selectedUser) => {
        setUsers((prevUsers) => followUserInList(prevUsers, selectedUser));
    };

    const handleUnfollowUser = async (selectedUser) => {
        setUsers((prevUsers) => unfollowUserInList(prevUsers, selectedUser));
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        searchTerm,
        setSearchTerm,
        filteredUsers,
        handleFollowUser,
        handleUnfollowUser,
        isLoading,
        error,
    };
}
export default useFeedUsers;