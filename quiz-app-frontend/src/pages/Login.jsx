import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {

        try {

            const response = await api.post("/user/login", {
                email,
                password
            });

            const token = response.data.token;

            login(token);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };

    return (

        <div style={{ width: "350px", margin: "100px auto" }}>

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>

    );
}

export default Login;