import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const sendForm = async (email, password) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!resp.ok) {
                throw new Error("Hubo un problema en la solicitud de registro");
            }

            navigate("/login"); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container form-body">
          <h1 className="title">Signup</h1>
          <div className="input-group">
            <p>E-mail</p>
            <input
              type="text"
              className="email"
              placeholder="Enter e-mail"
              aria-label="Enter e-mail"
              aria-describedby="basic-addon1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <input
              type="text"
              className="password"
              placeholder="Enter password"
              aria-label="Enter password"
              aria-describedby="basic-addon1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/login">
            <button type="button" className="btn btn-primary" onClick={sendForm}>
                Send
            </button>
          </Link>
        </div>
    );
}

export default Signup;
