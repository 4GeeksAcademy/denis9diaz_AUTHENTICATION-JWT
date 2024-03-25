import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const PrivateMenu = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login"); 
        } else {
            getMyTasks();
        }
    }, [navigate]);

    const getMyTasks = async () => {
        try {
            const token = localStorage.getItem("jwt-token");
    
            const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
    
            if (!resp.ok) {
                throw new Error("Error al obtener los datos");
            }
    
            const data = await resp.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="private-container text-center">
            <h1 className="private-title pt-5">Estás dentro!</h1>
            <p className="texto-private">Pulsa el botón "Logout" para cerrar sesión</p>
        </div>
    );
};

export default PrivateMenu;
