import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const sendLogin = async (email, password) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            if (!resp.ok) {
                throw new Error("Problema al iniciar sesión");
            }

            const data = await resp.json();
            localStorage.setItem("jwt-token", data.token);
            navigate("/privatemenu");
        } catch (error) {
            console.error(error);
            setError("Contraseña incorrecta"); 
        }
    };

    return (
        <div className="auth-container">
            <div className="container form-body">
                <h1 className="title">Login</h1>
                {error && <div className="error-message">{error}</div>} {}
                <div className="input-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        className="email"
                        placeholder="Enter e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={() => sendLogin(email, password)}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
