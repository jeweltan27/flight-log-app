import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import "../assets/Login.css";

const Login = () => {
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

    const handleOnSubmit = (event) => {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        
        navigate("/home");
    }

    const handleRegisterOnSubmit = (event) => {
        console.log("User registering")
        navigate("/register");
    }

    return(
        <div className="login">
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
                    Login
                </Button>
            </Form>

            <Form onSubmit={handleRegisterOnSubmit}>
                <p>
                    Not a user?
                    <br />
                    <Button variant="outline-dark" type="submit">
                        Register here
                    </Button>
                </p>
                
            </Form>
        </div>
        
    )
}

export default Login;