import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (email, password) => {
      console.log(email, password)
      const resp = await fetch(process.env.BACKEND_URL + "/api/signup", { 
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ "email": email, "password": password })
      })
      console.log(resp)
      if(!resp.ok) throw Error("There was a problem in the login request")
 
      if(resp.status === 401){
           throw("Invalid credentials")
      }
      else if(resp.status === 400){
           throw ("Invalid email or password format")
      }
      const data = await resp.json()

      localStorage.setItem("jwt-token", data.token);

      navigate("/login");

      return data
 }

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
            <button type="button" className="btn btn-primary" onClick={() => {handleSubmit(email, password)}}>
                Send
            </button>
        </div>
    );
}

export default Signup;
