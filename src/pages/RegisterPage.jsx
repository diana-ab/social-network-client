import {useState} from "react";
import {registerUser} from "../services/authService";

function RegisterPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const result = await registerUser({
                username: user.username,
                email: user.email,
                password: user.password
            });

            setMessage(result.message);
        } catch (error) {
            console.log(error);
            setMessage("Registration failed");
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>

                <button type="submit">Register</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default RegisterPage;