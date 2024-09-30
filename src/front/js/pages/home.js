import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	
	const login = () => {
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

		fetch("https://upgraded-space-waddle-69v77pw7pwqvf4v7r-3001.app.github.dev/api/login", requestOptions)
		.then(response => response.json())
		.then(result => {
			if(result.token) {
				localStorage.setItem("token", result.token);
				navigate("/demo");
			}
			else{ 
				setError(result.msg)};
		})
		
		.catch(error => console.log('error', error));}

	return (
		<div className="text-center mt-5">
			<h1>LOGIN</h1>			
			<p>
				<label className="form-label">Email:</label>
				<input className="form-control" onChange={(event)=> setEmail(event.target.value)}></input>
			</p>
			<p>
				<label className="form-label">Password:</label>
				<input className="form-control" onChange={(event)=> setPassword(event.target.value)}></input>
			</p>
			<button type="button" className="btn btn-outline-primary m-3" onClick={login}>Login</button>
			<button type="button" className="btn btn-outline-primary m-3"><Link to={"/signup"}>Signup</Link></button>
			{error && <div className="alert alert-danger" role="alert">
				{error}
				</div>}
		</div>
	);
};