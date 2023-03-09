import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import "../assets/Login.css";
const API_URL = "http://127.0.0.1:5000/user/"

const bearerToken = process.env.AUTH;
const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [hasError, setHasError] = useState(false);

    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
    }

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    }

    const handleOnSubmit = (event) => {
        setHasError(false);
        event.preventDefault();

        const user = {
            "username": username,
            "userPassword": password
        }
        
        axios.post(
            API_URL + "authenticate", 
            user, 
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
                setMessage(error.response.data.message);
                setHasError(true);
            })

        navigate("/home",
        {
            state: {
                username: username
            }
        });
            
    }

    const handleRegisterOnSubmit = (event) => {
        console.log("User registering")
        navigate("/register");
    }

    return(
        <div className="login">
            <h2>
                Login
            </h2>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className="w-25" type="text" placeholder="Enter username" required onChange={onChangeUsername}/>
                </Form.Group>

                <Form.Group className="mt-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="w-25" type="password" placeholder="Password" required onChange={onChangePassword} />
                </Form.Group>
                
                <Button className="mt-3 login-button" type="submit">
                    Login
                </Button>
            </Form>

            <Alert className="mt-3 w-25" variant="danger" show={hasError}>
                {message}
            </Alert>

            <Form onSubmit={handleRegisterOnSubmit}>
                <p className="register-form">
                    Not a user?
                    <a href="/register">
                        Register here
                    </a>
                </p>
                
            </Form>
        </div>
        
    )
}

export default Login;