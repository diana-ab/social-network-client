import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { logoutUser } from "../services/authService";

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
                setMessage("Request failed");
            });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div>
            <h1>Feed</h1>
            <button onClick={handleLogout}>Logout</button>
            <p>{message}</p>
        </div>
    );
}

export default FeedPage;