import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const token = localStorage.getItem('jwt-token');

            const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token 
                }
            });

            if (!resp.ok) {
                throw Error("There was a problem in the login request")
            } else if (resp.status === 403) {
                throw Error("Missing or invalid token");
            } else {
                const data = await resp.json();
                console.log("This is the data you requested", data);
            }
        } catch (error) {
            console.error(error.message);
        }

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
