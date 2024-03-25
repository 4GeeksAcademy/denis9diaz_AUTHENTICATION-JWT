import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("jwt-token");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">JWT Proyect</span>
                </Link>
                <div className="ml-auto">
                    <div style={{ display: "inline-block", marginRight: "10px" }}>
                        <Link to="/signup">
                            <button className="btn btn-primary">Signup</button>
                        </Link>
                    </div>
                    <div style={{ display: "inline-block", marginRight: "10px" }}>
                        <Link to="/login">
                            <button className="btn btn-success">Login</button>
                        </Link>
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <button className="btn btn-danger" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
