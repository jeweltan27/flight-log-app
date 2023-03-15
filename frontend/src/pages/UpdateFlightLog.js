import moment from 'moment';
import React, { useState } from 'react';
import axios from 'axios';
import TimePicker from 'react-bootstrap-time-picker';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../assets/UpdateFlightLog.css";
import takeoffLogo from "../assets/takeoff.png";
import landingLogo from "../assets/landing.png";

const API_URL = "https://flightlog-backend.herokuapp.com/flightLog"

const UpdateFlightLog = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { token, id, currentTailNumber, currentFlightID, currentTakeoff, currentLanding, currentDuration } = state;

    // Helper functions
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

    const reverseFormatTimeToSeconds = (time) => {
        time = time.slice(0, -1);
        const [hour, minute, second] = time.split(':').map(Number);
        const seconds = (hour * 3600) + (minute * 60) + second;
        return seconds;
    }
    const formatDurationString = (hour, minute) => {
        return hour + " hr " + minute + " min"
    }

    const calculateDuration = (takeoffDateTimeISO, landingDateTimeISO) => {
        const millisecondsDiff = new Date(landingDateTimeISO) - new Date(takeoffDateTimeISO);
        const hours   = Math.floor(millisecondsDiff / (1000 * 60 * 60));
        const minutes = Math.floor((millisecondsDiff - (hours * 1000 * 60 * 60)) / (1000 * 60));

        return [hours, minutes]
    }

    const isoFormatDateTime = (date, time) => {
        const formatTimeString = formatTimeToHHMMSS(time);
        return date + "T" + formatTimeString + "Z";
    }

    // Format date and time to match input fields' required format
    const currentTakeoffDate = moment(currentTakeoff).utc().format('YYYY-MM-DD');
    const currentTakeoffTime = reverseFormatTimeToSeconds(currentTakeoff.split('T')[1]);

    const currentLandingDate = moment(currentLanding).utc().format('YYYY-MM-DD');
    const currentLandingTime = reverseFormatTimeToSeconds(currentLanding.split('T')[1]);

    const currentHour = currentDuration.split(' ')[0];
    const currentMinute = currentDuration.split(' ')[2];

    // Set default values to the existing flightlog's data
    const [tailNumber, setTailNumber] = useState(currentTailNumber);
    const [flightID, setFlightID] = useState(currentFlightID);
    const [takeoffDate, setTakeoffDate] = useState(currentTakeoffDate);
    const [takeoffTime, setTakeoffTime] = useState(currentTakeoffTime);
    const [landingDate, setLandingDate] = useState(currentLandingDate);
    const [landingTime, setLandingTime] = useState(currentLandingTime);
    const [durationHours, setDurationHours] = useState(currentHour);
    const [durationMinutes, setDurationMinutes] = useState(currentMinute);
    const [invalidDate, setInvalidDate] = useState(false);
    const [invalidDateMessage, setInvalidDateMessage] = useState('');

    // When input fields change
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
        else {
            setInvalidDate(false);
            setInvalidDateMessage('');
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
    const onChangeDurationHours = (event) => {
        const durationHour = event.target.value;
        setDurationHours(durationHour);
    }
    const onChangeDurationMinutes = (event) => {
        const durationMinute = event.target.value;
        setDurationMinutes(durationMinute);
    }

    const handleGoBack = (e) => {
        navigate(
            "/home",
            { 
                state: {
                    token: token
                }
            }
        );
    }

    // When user updates flightlog
    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        // Format date and time to ISO8601 format for storage
        const isoFormatTakeoff = isoFormatDateTime(takeoffDate, takeoffTime);
        const isoFormatLanding = isoFormatDateTime(landingDate, landingTime);
        const formatDuration = formatDurationString(durationHours, durationMinutes);
        const updatedFlightLog = {
            tailNumber: tailNumber,
            flightID: flightID,
            takeoff: isoFormatTakeoff,
            landing: isoFormatLanding,
            duration: formatDuration
        }
        axios.put(
            API_URL + "/" + id, 
            updatedFlightLog,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data)
                navigate(
                    "/home",
                    {state: { token: token }}
                );
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="giant-block">
            <Row>
                <Col md="auto">
                    <Button onClick={handleGoBack} className="back-button" variant="light">
                        Go back
                    </Button>
                </Col>
                <Col className="second-col">
                    <h2>Update Flightlog</h2>
                </Col>
            </Row>

            <p>
                ID: {id}
            </p>

            <Form className="form" onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="tailNumber">
                    <Form.Label>Tail Number</Form.Label>
                    <Form.Control className="input-field" required type="text" value={tailNumber} onChange={onChangeTailNumber}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="flightID">
                    <Form.Label>Flight ID</Form.Label>
                    <Form.Control className="input-field" required type="text"  value={flightID} onChange={onChangeFlightID}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="takeoff">
                    <Form.Label>Takeoff Time</Form.Label>
                    <img src={takeoffLogo} width="40px" alt="takeoff" />
                    <Form.Control className="input-field mb-2" required type="date" value={takeoffDate} onChange={onChangeTakeoffDate} />
                    <TimePicker className="input-field" step={1} value={takeoffTime} onChange={onChangeTakeoffTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="landing">
                    <Form.Label>Landing Time</Form.Label>
                    <img src={landingLogo} width="40px" alt="landing" />
                    <Alert id="error" variant="danger" show={invalidDate}>{invalidDateMessage}</Alert>
                    <Form.Control className="input-field mb-2" required type="date" min={takeoffDate} value={landingDate} onChange={onChangeLandingDate} />
                    <TimePicker className="input-field" step={1} value={landingTime} onChange={onChangeLandingTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Row className="mb-2">
                        <Col>
                            <Form.Control required type="number" min="0" value={durationHours} onChange={onChangeDurationHours} />
                        </Col>
                        <Col className="hours">
                            Hours
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control required type="number" min="0" max="59" value={durationMinutes} onChange={onChangeDurationMinutes} />
                        </Col>
                        <Col className="minutes">
                            Minutes
                        </Col>
                    </Row>
                </Form.Group>
                
                <Button className="update-button" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default UpdateFlightLog