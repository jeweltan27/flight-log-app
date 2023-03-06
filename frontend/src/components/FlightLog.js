import React from 'react'
import Button from 'react-bootstrap/Button';
import "../assets/Home.css";

const FlightLog = (props) => {
    console.log(props.flightlog);
    const takeoffDateString = new Date(props.flightlog.takeoff).toLocaleDateString();
    const takeoffTimeString = new Date(props.flightlog.takeoff).toLocaleTimeString();

    const landingDateString = new Date(props.flightlog.landing).toLocaleDateString();
    const landingTimeString = new Date(props.flightlog.landing).toLocaleTimeString();

    console.log(landingDateString);

    return (
        <>
            <tr>
                <td>
                    {props.flightlog.tailNumber}
                </td>

                <td>
                    {props.flightlog.flightID}
                </td>

                <td>
                    {takeoffDateString + " " + takeoffTimeString}
                </td>

                <td>
                    {landingDateString + " " + landingTimeString}

                </td>

                <td>
                    {props.flightlog.duration}
                </td>

                <td>
                    <Button className="first-button" variant="primary">Update</Button>
                    <Button variant="danger">Delete</Button>
                </td>

            </tr>
        </>
    )
}

export default FlightLog