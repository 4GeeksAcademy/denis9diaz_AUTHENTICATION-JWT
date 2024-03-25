import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendLogin = async (email, password) => {
    try {
      const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        throw new Error("Problema al iniciar sesión");
      }

      const data = await resp.json();
      localStorage.setItem("jwt-token", data.token);
      
      await getMyTasks();

      navigate("/privatemenu");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container form-body">
      <h1 className="title">Login</h1>
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
          type="password"
          className="password"
          placeholder="Enter password"
          aria-label="Enter password"
          aria-describedby="basic-addon1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={sendLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
