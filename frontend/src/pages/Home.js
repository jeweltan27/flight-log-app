import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 
import FlightLogs from '../components/FlightLogs'
import "../assets/Home.css";
import Button from 'react-bootstrap/Button';

const API_URL = "http://127.0.0.1:5000/"

const Home = () => {
    console.log("Inside Home page")
    const navigate = useNavigate();
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
            <h2>
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