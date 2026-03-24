import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api/axiosClient.js";

function ValidateSession({ children }) {

    const [status, setStatus] = useState("loading");

    useEffect(() => {

        const checkSession = async () => {
            try {
                const response = await api.post("/refresh");

                if (response.data?.success) {
                    setStatus("authenticated");
                } else {
                    setStatus("unauthenticated");
                }

            } catch (error) {

                console.error("Session validation failed:", error);

                setStatus("unauthenticated");
            }

        };

        checkSession();

    }, []);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ValidateSession;