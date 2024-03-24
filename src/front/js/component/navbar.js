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
                    <Link to="/signup">
                        <button className="btn btn-primary">Signup</button>
                    </Link>
                    <button className="btn btn-primary" onClick={logout}>
                        Log out
                    </button>
                </div>
            </div>
        </nav>
    );
};
