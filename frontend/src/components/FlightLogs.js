import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import FlightLog from './FlightLog';

const FlightLogs = (props) => {
    console.log("Inside FlightLogs component")

    const [ flightlogs, setFlightlogs ] = useState(props.flightlogs);
    
    useEffect(() => { 
        setFlightlogs(props.flightlogs); 
      }, [props.flightlogs]);
    
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tail Number</th>
                    <th>Flight ID</th>
                    <th>Takeoff Time</th>
                    <th>Landing Time</th>
                    <th>Duration</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {flightlogs && flightlogs.length > 0 ? 
                    
                    flightlogs.map(flightlog => (
                        <FlightLog key={flightlog.id} flightlog={flightlog} /> 
                    )) :
                    <tr>
                        <td colSpan="12">
                            There are no flightlogs!
                            Create a new one.
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
    )
}

export default FlightLogs