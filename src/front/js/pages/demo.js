import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch("https://upgraded-space-waddle-69v77pw7pwqvf4v7r-3001.app.github.dev/api/private", requestOptions);
                const result = await response.json();

                if (!response.ok || result.error) {
                    navigate("/");
                }
            } catch (error) {
                console.log('error', error);
                navigate("/");
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container">
            <ul className="list-group">
                {store.demo.map((item, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                        style={{ background: item.background }}>
                        <Link to={"/single/" + index}>
                            <span>Link to: {item.title}</span>
                        </Link>
                        {item.background === "orange" && (
                            <p style={{ color: item.initial }}>
                                Check store/flux.js scroll to the actions to see the code
                            </p>
                        )}
                        <button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
                            Change Color
                        </button>
                    </li>
                ))}
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary m-3">Back home</button>
            </Link>
            <button className="btn btn-primary m-3" onClick={handleLogout}>Logout</button>
        </div>
    );
};

