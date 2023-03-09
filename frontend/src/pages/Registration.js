import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import "../assets/Login.css";
const API_URL = "http://127.0.0.1:5000/user/"
const bearerToken = process.env.AUTH;

export const Registration = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
    }

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    }

    const handleOnSubmit = (e) => {
        const newUser = {
            "username": username,
            "password": password
        }

        e.preventDefault();
       
        axios.post(
            API_URL + "register", 
            newUser,
            {
                headers: {
                    'Authorization': 'Bearer ' + bearerToken,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })

        navigate("/");

    }
  return (
    <div className="register">
        <h2>
            Register new account
        </h2>
        <Form onSubmit={handleOnSubmit}>
            <Form.Group className="form-group" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" required onChange={onChangeUsername}/>
            </Form.Group>

            <Form.Group className="form-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onChange={onChangePassword} />
            </Form.Group>
            
            <Button className="register-button" type="submit">
                Register
            </Button>
        </Form>
    </div>
  )
}

export default Registration;