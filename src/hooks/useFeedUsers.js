import {useState} from "react";
import {followUserInList, unfollowUserInList} from "../utils/feedUsersHelpers.js";

function useFeedUsers() {
    const [searchTerm, setSearchTerm] = useState("");

    const [users, setUsers] = useState([
        { id: 1, username: "shimon", isFollowing: false },
        { id: 4, username: "shimon2", isFollowing: false },
        { id: 6, username: "shimon3", isFollowing: false },
        { id: 5, username: "shim", isFollowing: false },
        { id: 7, username: "shi", isFollowing: false },
        { id: 2, username: "diana", isFollowing: true },
        { id: 3, username: "kloy", isFollowing: false }
    ]);
    const handleFollowUser = (selectedUser) => {
        setUsers((prevUsers) => followUserInList(prevUsers, selectedUser));
    };

    const handleUnfollowUser = (selectedUser) => {
        setUsers((prevUsers) => unfollowUserInList(prevUsers, selectedUser));
    };


    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        searchTerm, setSearchTerm, users,filteredUsers,handleFollowUser , handleUnfollowUser}

}
export default useFeedUsers;