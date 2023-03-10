import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import "../assets/Login.css";
const API_URL = "http://127.0.0.1:5000/user/"

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
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((error) => {
                console.log(error)
            })


    }
  return (
    <div className="container-fluid">
            
        <div className="login">
        
            <h2 className='mb-3'>
                Register
            </h2>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className="field" type="text" placeholder="Enter username" required onChange={onChangeUsername}/>
                </Form.Group>

                <Form.Group className="mt-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="field" type="password" placeholder="Password" required onChange={onChangePassword} />
                </Form.Group>
                
                <Button className="mt-3 login-button" type="submit">
                    Register
                </Button>
            </Form>

            <p className="register-form">
                <a href="/">
                    Back to login page
                </a>
            </p>

        </div>

        </div>
  )
}

export default Registration;