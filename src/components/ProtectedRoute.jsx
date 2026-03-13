import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;