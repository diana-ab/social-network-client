import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../auth/services/authService.js";

function useLogout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return {
        handleLogout,
    };
}
export default useLogout;