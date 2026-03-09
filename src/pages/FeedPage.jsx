import { useEffect, useState } from "react";
import api from "../api/axiosClient";

function FeedPage() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        api.get("/test")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage("Request failed");
            });
    }, []);

    return (
        <div>
            <h1>Feed</h1>
            <p>{message}</p>
        </div>
    );
}

export default FeedPage;