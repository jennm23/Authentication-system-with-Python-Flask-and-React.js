import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signup = () => {
        console.log(email, password);
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email: email,
            password: password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BACKEND_URL}/api/signup`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.email) {
                    navigate("/");
                } else {
                    setError('El usuario ya existe');
                }
            })
            .catch(error => {
                setError('Hubo un problema al registrar el usuario');
                console.log('Error:', error);
            });
    };

    return (
        <div className="container text-center mt-5">
            <h1>Registro</h1>
            <p>
                <label className="form-label">Email: </label>
                <input 
                    type="email"
                    className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    required
                />
            </p>
            <p>
                <label className="form-label">Contraseña: </label>
                <input 
                    type="password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required
                />
            </p>
            <button className="btn btn-outline-primary" onClick={signup}>Registrarse</button>
            {error && 
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            }
        </div>
    );
};
