import React from 'react'
import Button from 'react-bootstrap/Button';

import axios from "axios"; 
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import "../assets/Home.css";
const API_URL = "http://127.0.0.1:5000/flightLog"

const FlightLog = (props) => {
    console.log("Inside FlightLog component")
    console.log(props.flightlog);

    const navigate = useNavigate();
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
                id: flightlog.id,
                currentTailNumber: flightlog.tailNumber,
                currentFlightID: flightlog.flightID,
                currentTakeoff: flightlog.takeoff,
                currentLanding: flightlog.landing,
                currentDuration: flightlog.duration    
            }}
        );
        window.location.reload();
    }

    const handleDelete = (event) => {
        event.preventDefault()
        axios.delete(API_URL + "/" + flightlog.id)
        .then((response) => {
            console.log(response.data)
        });
        navigate("/");
        window.location.reload()
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