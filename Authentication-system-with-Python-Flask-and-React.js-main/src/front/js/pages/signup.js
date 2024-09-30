import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signup = () => {
        console.log(email, password)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": email,
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://3001-4geeksacade-reactflaskh-ea2apv1hwm8.ws-eu79.gitpod.io/api/signup", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.email) {
                navigate("/")
            } else {
                setError('El usuario ya existe')};
        })
        .catch(error => console.log('error', error));
    }
    

    return (
        <div className="container text-center mt-5">
            <h1>SIGNUP</h1>
            <p>
                <label class="form-label">Email: </label>
                <input class="form-control" onChange={(event) => setEmail(event.target.value)}></input>
            </p>
            <p>
                <label class="form-label">Password: </label>
                <input class="form-control" onChange={(event) => setPassword(event.target.value)}></input>
            </p>
            <button class="btn btn-outline-primary" onClick={signup}>Signup</button>
            {error && <div class="alert alert-danger" role="alert">
				{error}
                </div>}
        </div>
    )
}