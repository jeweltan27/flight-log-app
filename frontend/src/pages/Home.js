import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"; 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FlightLogs from '../components/FlightLogs'
import "../assets/Home.css";
import Logout from "../assets/logout.png";

const API_URL = "http://127.0.0.1:5000/"

const Home = () => {
    console.log("Inside Home page")
    const navigate = useNavigate();
    const {state} = useLocation();
    const { username } = state;
    const [flightlogs, setFlightlogs] = useState();
    const onHandleClick = (e) => {
        navigate("/newflightlog");
    }

    useEffect( () => {
        getAllFlightlogs();
    }, []);

    const getAllFlightlogs = () => {
        axios.get(API_URL + "flightLog")
        .then((response) => {
            setFlightlogs(response.data.data);
            console.log(response.data.data);
            return response.data.data;
        });
    }

    return (
        <div className="home">

            <a href="/" className="logout">
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