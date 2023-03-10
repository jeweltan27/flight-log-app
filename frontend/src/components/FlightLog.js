import React from 'react'
import Button from 'react-bootstrap/Button';

import axios from "axios"; 
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
import "../assets/Home.css";
const API_URL = "http://127.0.0.1:5000/flightLog"

const FlightLog = (props) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { token } = state;

    const flightlog = props.flightlog;
    const takeoffDateString = moment(flightlog.takeoff).utc().format('DD-MMM-YYYY');
    const takeoffTimeString = flightlog.takeoff.split('T')[1].slice(0, -1);
    const landingDateString = moment(flightlog.landing).utc().format('DD-MMM-YYYY');
    const landingTimeString = flightlog.landing.split('T')[1].slice(0, -1);
    
    const handleUpdate = (event) => {
        event.preventDefault()
        navigate(
            "/updateflightlog",
            { state: {
                token: token,
                id: flightlog.id,
                currentTailNumber: flightlog.tailNumber,
                currentFlightID: flightlog.flightID,
                currentTakeoff: flightlog.takeoff,
                currentLanding: flightlog.landing,
                currentDuration: flightlog.duration    
            }}
        );
    }

    const handleDelete = (event) => {
        event.preventDefault()
        axios.delete(
            API_URL + "/" + flightlog.id,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
            )
        .then((response) => {
            console.log(response.data)
            window.location.reload()
        })
        .catch((error) => {
            console.log(error)
        });
    }

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
                    <Button className="update-buttons" onClick={handleUpdate}>Update</Button>
                    <Button className="delete-buttons" variant="outline-danger" onClick={handleDelete} >Delete</Button>
                </td>

            </tr>
        </>
    )
}

export default FlightLog