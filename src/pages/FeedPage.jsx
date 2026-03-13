import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../api/axiosClient";
import { logoutUser } from "../services/authService";

function FeedPage() {
    const [message, setMessage] = useState("Loading...");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }

        api.get("/test")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);

                if (error.response && error.response.status === 401) {
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    navigate("/login");
                    return;
                }

                setMessage("Request failed");
            });
    }, [navigate]);

    const handleLogout = async () => {
        const refreshToken = Cookies.get("refreshToken");

        try {
            if (refreshToken) {
                await logoutUser(refreshToken);
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            navigate("/login");
        }
    };

    return (
        <div>
            <h1>Feed</h1>
            <p>{message}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default FeedPage;