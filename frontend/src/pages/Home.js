import React from 'react'
// import FlightLogs from '../components/FlightLogs'
import "../assets/Home.css";

const Home = () => {
    const flightlogs = [
        {
            tailNumber: "001",
            flightID: "SQ351",
            takeoff: "2023-02-15T00:00:00+08:00",
            landing: "2023-02-15T00:12:30+08:00",
            duration: "12h 30 min",
        },
        {
            tailNumber: "002",
            flightID: "SQ352",
            takeoff: "2023-02-17T23:00:00+08:00",
            landing: "2023-02-18T00:12:15+08:00",
            duration: "13h 15 min",
        }
    ]
    return (
        <div className="home">
            <h2>
                Flight Logs
            </h2>
        </div>
    )
}

export default Home