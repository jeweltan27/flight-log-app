import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import TimePicker from 'react-bootstrap-time-picker';
import { useNavigate } from 'react-router-dom';

import "../assets/NewFlightLog.css";
import takeoffLogo from "../assets/takeoff.png";
import landingLogo from "../assets/landing.png";

const API_URL = "http://127.0.0.1:5000/flightLog"

const NewFlightLog = () => {
    const navigate = useNavigate();

    const [tailNumber, setTailNumber] = useState();
    const [flightID, setFlightID] = useState();
    const [takeoffDate, setTakeoffDate] = useState();
    const [takeoffTime, setTakeoffTime] = useState(0);
    const [landingDate, setLandingDate] = useState();
    const [landingTime, setLandingTime] = useState(0);
    const [durationHours, setDurationHours] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);

    const onChangeTailNumber = (event) => {
        const tailNumber = event.target.value;
        setTailNumber(tailNumber);
    }
    const onChangeFlightID = (event) => {
        const flightID = event.target.value;
        setFlightID(flightID);
    }
    const onChangeTakeoffDate = (event) => {
        const takeoffDate = event.target.value;
        setTakeoffDate(takeoffDate);
    }
    const onChangeTakeoffTime = (time) => {
        const takeoffTime = time;
        setTakeoffTime(takeoffTime);
    }
    const onChangeLandingDate = (event) => {
        const landingDate = event.target.value;
        setLandingDate(landingDate);
    }
    const onChangeLandingTime = (time) => {
        const landingTime = time;
        setLandingTime(landingTime);
    }
    const onChangeDurationHours = (event) => {
        const durationHour = event.target.value;
        setDurationHours(durationHour);
    }
    const onChangeDurationMinutes = (event) => {
        const durationMinute = event.target.value;
        setDurationMinutes(durationMinute);
    }
    const formatTimeToHHMMSS = (time) => {
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

    const formatDurationString = (hour, minute) => {
        return hour + " hr " + minute + " min"
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const formatTakeoffTime = formatTimeToHHMMSS(takeoffTime);
        const formatLandingTime = formatTimeToHHMMSS(landingTime);
        const isoFormatTakeoff = takeoffDate + "T" + formatTakeoffTime + "Z";
        const isoFormatLanding = landingDate + "T" + formatLandingTime + "Z";
        const formatDuration = formatDurationString(durationHours, durationMinutes);
        const newFlightLog = {
            tailNumber: tailNumber,
            flightID: flightID,
            takeoff: isoFormatTakeoff,
            landing: isoFormatLanding,
            duration: formatDuration
        }
        axios.post(API_URL, newFlightLog)
            .then((response) => {
                console.log(response.data)
            })
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="giant-block">
            <Row>
                <Col md="auto">
                    <a href="/" className="link-secondary">
                        Go back
                    </a>
                </Col>
                <Col className="second-col">
                    <h2>Create New Flightlog</h2>
                </Col>
            </Row>

            <Form className="form" onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="tailNumber">
                    <Form.Label>Tail Number</Form.Label>
                    <Form.Control type="text" placeholder="A380" onChange={onChangeTailNumber}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="flightID">
                    <Form.Label>Flight ID</Form.Label>
                    <Form.Control type="text" placeholder="SQ001" onChange={onChangeFlightID}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="takeoff">
                    <Form.Label>Takeoff</Form.Label>
                    <img src={takeoffLogo} width="40px" alt="takeoff" />
                    <Form.Control className="mb-2" type="date" onChange={onChangeTakeoffDate} />
                    <TimePicker start="00:00" end="23:59" step={1} value={takeoffTime} onChange={onChangeTakeoffTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="landing">
                    <Form.Label>Landing</Form.Label>
                    <img src={landingLogo} width="40px" alt="landing" />
                    <Form.Control className="mb-2" type="date" min={takeoffDate} onChange={onChangeLandingDate} />
                    <TimePicker start="00:00" end="23:59" step={1} value={landingTime} onChange={onChangeLandingTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Row className="mb-2">
                        <Col>
                            <Form.Control type="number" min="0" value={durationHours} onChange={onChangeDurationHours} />
                        </Col>
                        <Col className="mb-0">
                            Hours
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control type="number" min="0" max="59" value={durationMinutes} onChange={onChangeDurationMinutes} />
                        </Col>
                        <Col>
                            Minutes
                        </Col>
                    </Row>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default NewFlightLog