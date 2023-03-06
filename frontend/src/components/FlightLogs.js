import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import FlightLog from './FlightLog';

const FlightLogs = (props) => {
    const [ flightlogs, setFlightLogs ] = useState(props.flightlogs);
    console.log(flightlogs);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Tail Number</th>
                    <th>Flight ID</th>
                    <th>Take Off Time</th>
                    <th>Landing Time</th>
                    <th>Duration</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    flightlogs.map(flightlog => (
                        <FlightLog key={flightlog.tailNumber} flightlog={flightlog} /> 
                    ))
                }
            </tbody>
            </Table>
    )
}

export default FlightLogs