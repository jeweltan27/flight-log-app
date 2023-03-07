import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import "../assets/Home.css";
const API_URL = "http://127.0.0.1:5000/flightLog"

const FlightLog = (props) => {
    console.log("Inside FlightLog component")
    console.log(props.flightlog);

    const navigate = useNavigate();
    const flightlog = props.flightlog;
    const takeoffDateString = new Date(flightlog.takeoff).toLocaleDateString();
    const takeoffTimeString = new Date(flightlog.takeoff).toLocaleTimeString();

    const landingDateString = new Date(flightlog.landing).toLocaleDateString();
    const landingTimeString = new Date(flightlog.landing).toLocaleTimeString();

    

    return (
        <>
            <tr>
                <td>
                    {flightlog.id}
                </td>

                <td>
                    {flightlog.tailNumber}
                </td>

                <td>
                    {flightlog.flightID}
                </td>

                <td>
                    {takeoffDateString + " " + takeoffTimeString}
                </td>

                <td>
                    {landingDateString + " " + landingTimeString}

                </td>

                <td>
                    {flightlog.duration}
                </td>

                <td>
                    <Button className="first-button" variant="primary">Update</Button>
                    <Button variant="outline-danger" >Delete</Button>
                </td>

            </tr>
        </>
    )
}

export default FlightLog