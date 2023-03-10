import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"; 
import Button from 'react-bootstrap/Button';
import FlightLogs from '../components/FlightLogs'
import "../assets/Home.css";

const API_URL = "http://127.0.0.1:5000/"

const Home = () => {
    console.log("Inside Home page")
    const navigate = useNavigate();
    const { state } = useLocation();
    if (state === null) {
        localStorage.clear();
        navigate("/");
    }
    const { token } = state;
    const username = localStorage.getItem("username");
    const [flightlogs, setFlightlogs] = useState();
    const onHandleClick = (e) => {
        navigate(
            "/newflightlog",
            {
                state: {
                    token: token
                }
            }
            );
    }

    const onHandleLogout = (e) => {
        localStorage.clear();
    }
    useEffect( () => {
        const getAllFlightlogs = () => {
            axios.get(
                API_URL + "flightLog",
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                setFlightlogs(response.data.data);
                console.log(response.data.data);
                return response.data.data;
            });
        };
        getAllFlightlogs()
    }, [token]);


    return (
        <div className="home">

            <a onClick={onHandleLogout} href="/" className="logout">
                Log Out
            </a>
            
            <h6>
                Welcome, {username}!
            </h6>

            <h2 className="mt-5">
                Flight Logs
            </h2>

            <div className="create-button-div">
                <Button className="create-button" onClick={onHandleClick}>
                    Create New Flightlog
                </Button>
            </div>
                
            <FlightLogs flightlogs={flightlogs} />

        </div>
    )
}

export default Home