import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { logoutUser } from "../services/authService";
import UserCardBase from "../components/dashboard/user/UserCardBase.jsx";
import FollowingItem from "../components/dashboard/user/FollowingItem.jsx";
import FollowingList from "../components/dashboard/user/FollowingList.jsx";

function FeedPage() {
    const [message, setMessage] = useState("Loading...");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/test")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage("Failed to load feed");
            });
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const users =[
        { id: 1, username:"shimon"},
        {id: 2, username:"diana"},
        {id: 3, username:"kloy"}
    ]

    return (
        <div style={{ width: "300px", marginTop: "20px" }}>
            <h1>Feed</h1>
            <button onClick={handleLogout}>Logout</button>
            <p>{message}</p>
            <div >
                <FollowingList
                users={users}/>
            </div>
        </div>
    );
}

export default FeedPage;