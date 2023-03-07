import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../assets/NewFlightLog.css";
import TimePicker from 'react-bootstrap-time-picker';

const NewFlightLog = () => {
    const [tailNumber, setTailNumber] = useState('');
    const [flightID, setFlightID] = useState('');
    const [takeoffDate, setTakeoffDate] = useState('');
    const [takeoffTime, setTakeoffTime] = useState('0');
    const [landingDate, setLandingDate] = useState('');
    const [landingTime, setLandingTime] = useState('');
    const [duration, setDuration] = useState('');

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
        console.log(time);
        const landingTime = time;
        setLandingTime(landingTime);
    }
    const onChangeDuration = (event) => {
        const duration = event.target.value;
        setDuration(duration);
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
    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        console.log(tailNumber)
        console.log(flightID)
        
        console.log(takeoffDate)
        const formatTakeoffDate = takeoffDate.split('-').reverse().join('/');
        console.log(formatTakeoffDate)
        
        console.log(takeoffTime)
        const formatTakeoffTime = formatTimeToHHMMSS(takeoffTime);
        console.log(formatTakeoffTime);

        console.log(landingDate)
        const formatLandingDate = landingDate.split('-').reverse().join('/');
        console.log(formatLandingDate)

        console.log(landingTime)
        const formatLandingTime = formatTimeToHHMMSS(landingTime);
        console.log(formatLandingTime);
        
        console.log(duration)
    }

    return (
        <div className="container">
            <h2>
                Create new flight log
            </h2>

            <Form className="form" onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="tailNumber">
                    <Form.Label>Tail Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter a number" onChange={onChangeTailNumber}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="flightID">
                    <Form.Label>Flight ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter a number" onChange={onChangeFlightID}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="takeoff">
                    <Form.Label className="takeoff-time">Takeoff Time</Form.Label>
                    <Form.Control className="mb-2" type="date" placeholder="" onChange={onChangeTakeoffDate} />
                    <TimePicker start="00:00" end="23:59" step={1} value={takeoffTime} onChange={onChangeTakeoffTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="landing">
                    <Form.Label className="landing-time">Landing Time</Form.Label>
                    <Form.Control className="mb-2" type="date" min={takeoffDate} onChange={onChangeLandingDate} />
                    <TimePicker start="00:00" end="23:59" step={1} value={landingTime} onChange={onChangeLandingTime} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" placeholder="0h 0min" onChange={onChangeDuration} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default NewFlightLog