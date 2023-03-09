import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import TimePicker from 'react-bootstrap-time-picker';
import { useNavigate } from 'react-router-dom';

import "../assets/NewFlightLog.css";
import takeoffLogo from "../assets/takeoff.png";
import landingLogo from "../assets/landing.png";

const API_URL = "http://127.0.0.1:5000/flightLog"

const NewFlightLog = () => {
    const navigate = useNavigate();
    const today = new Date().toISOString().substring(0, 10);

    const [tailNumber, setTailNumber] = useState();
    const [flightID, setFlightID] = useState();
    const [takeoffDate, setTakeoffDate] = useState(today);
    const [takeoffTime, setTakeoffTime] = useState(0);
    const [landingDate, setLandingDate] = useState(today);
    const [landingTime, setLandingTime] = useState(0);
    const [durationHours, setDurationHours] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [invalidDate, setInvalidDate] = useState(false);
    const [invalidDateMessage, setInvalidDateMessage] = useState('');
    

    const calculateDuration = (takeoffDateTimeISO, landingDateTimeISO) => {
        const millisecondsDiff = new Date(landingDateTimeISO) - new Date(takeoffDateTimeISO);
        const hours   = Math.floor(millisecondsDiff / (1000 * 60 * 60));
        const minutes = Math.floor((millisecondsDiff - (hours * 1000 * 60 * 60)) / (1000 * 60));

        return [hours, minutes]
    }

    const onChangeTailNumber = (event) => {
        const tailNumber = event.target.value;
        setTailNumber(tailNumber);
    }
    const onChangeFlightID = (event) => {
        const flightID = event.target.value;
        setFlightID(flightID);
    }
    const onChangeTakeoffDate = (event) => {
        setInvalidDate(false);
        setInvalidDateMessage('');
        const takeoffDate = event.target.value;
        setTakeoffDate(takeoffDate);
        const isoFormatCurrentTakeoff = isoFormatDateTime(takeoffDate, takeoffTime);
        const isoFormatCurrentLanding = isoFormatDateTime(landingDate, landingTime);
        const [hours, minutes] = calculateDuration(isoFormatCurrentTakeoff, isoFormatCurrentLanding);

        if (hours < 0 || minutes < 0) {
            setInvalidDate(true);
            setInvalidDateMessage("Landing date cannot be before takeoff date!")
        }

        setDurationHours(hours);
        setDurationMinutes(minutes);
    }
    const onChangeTakeoffTime = (time) => {

        const takeoffTime = time;
        setTakeoffTime(takeoffTime);
        const isoFormatCurrentTakeoff = isoFormatDateTime(takeoffDate, takeoffTime);
        const isoFormatCurrentLanding = isoFormatDateTime(landingDate, landingTime);
        const [hours, minutes] = calculateDuration(isoFormatCurrentTakeoff, isoFormatCurrentLanding);
        setDurationHours(hours);
        setDurationMinutes(minutes);
    }
    const onChangeLandingDate = (event) => {
        const landingDate = event.target.value;
        setLandingDate(landingDate);
        const isoFormatCurrentTakeoff = isoFormatDateTime(takeoffDate, takeoffTime);
        const isoFormatCurrentLanding = isoFormatDateTime(landingDate, landingTime);
        const [hours, minutes] = calculateDuration(isoFormatCurrentTakeoff, isoFormatCurrentLanding);
        
        if (hours < 0 || minutes < 0) {
            setInvalidDate(true);
            setInvalidDateMessage("Landing date cannot be before takeoff date!")
        }
        else {
            setInvalidDate(false);
            setInvalidDateMessage('');
        }

        setDurationHours(hours);
        setDurationMinutes(minutes);
    }
    const onChangeLandingTime = (time) => {
        const landingTime = time;
        setLandingTime(landingTime);
        const isoFormatCurrentTakeoff = isoFormatDateTime(takeoffDate, takeoffTime);
        const isoFormatCurrentLanding = isoFormatDateTime(landingDate, landingTime);
        const [hours, minutes] = calculateDuration(isoFormatCurrentTakeoff, isoFormatCurrentLanding);
        setDurationHours(hours);
        setDurationMinutes(minutes);
    }
    const onChangeDurationHours = (event) => {
        const durationHour = event.target.value;
        setDurationHours(durationHour);
    }
    const onChangeDurationMinutes = (event) => {
        const durationMinute = event.target.value;
        setDurationMinutes(durationMinute);
    }

    const isoFormatDateTime = (date, time) => {
        const formatTimeString = formatTimeToHHMMSS(time);
        return date + "T" + formatTimeString + "Z";
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

        const isoFormatTakeoff = isoFormatDateTime(takeoffDate, takeoffTime);
        const isoFormatLanding = isoFormatDateTime(landingDate, landingTime);
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
        navigate("/home");
        window.location.reload();
    }

    return (
        <div className="giant-block">
            <Row>
                <Col md="auto">
                    <a href="/home" className="link-secondary">
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
                    <Form.Control type="text" onChange={onChangeTailNumber}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="flightID">
                    <Form.Label>Flight ID</Form.Label>
                    <Form.Control type="text" onChange={onChangeFlightID}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="takeoff">
                    <Form.Label>Takeoff</Form.Label>
                    <img src={takeoffLogo} width="40px" alt="takeoff" />
                    <Form.Control className="mb-2" type="date" value={takeoffDate} onChange={onChangeTakeoffDate} />
                    <TimePicker start="00:00" end="23:59" step={1} value={takeoffTime} onChange={onChangeTakeoffTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="landing">
                    <Form.Label>Landing</Form.Label>
                    <img src={landingLogo} width="40px" alt="landing" />
                    <Alert variant="danger" show={invalidDate}>{invalidDateMessage}</Alert>
                    <Form.Control className="mb-2" type="date" value={landingDate} min={takeoffDate} onChange={onChangeLandingDate} />
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