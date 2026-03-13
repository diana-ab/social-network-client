import { useState } from "react";
import { loginUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const result = await loginUser({
                username: user.username,
                password: user.password,
            });

            console.log("LOGIN RESULT:", result);

            if (result.success) {
                navigate("/feed");
            } else {
                setMessage("Login failed");
            }
        } catch (error) {
            console.log("LOGIN ERROR:", error);
            console.log("RESPONSE DATA:", error?.response?.data);
            setMessage("Error logging in");
        }
    };

    return (
        <div>
            <h1>login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default LoginPage;