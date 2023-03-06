import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import "../assets/Login.css";

export const Registration = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
        console.log("Username is", username);
    }

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
        console.log("Password is", password);

    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        console.log("Username and password", username, password);
        navigate("/");
    }
  return (
    <div className="register">
        <Form onSubmit={handleOnSubmit}>
            <Form.Group className="form-group" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" required onChange={onChangeUsername}/>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onChange={onChangePassword} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    </div>
  )
}

export default Registration;