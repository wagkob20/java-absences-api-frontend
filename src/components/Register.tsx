import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedFullName = fullName.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
            setError('All fields are required.');
            setSuccess('');
            return;
        }

        const body = {
            fullName: trimmedFullName,
            email: trimmedEmail,
            password: trimmedPassword
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess('Registration successful! You can now log in.');
                setError('');
                navigate("/login");
            } else {
                console.error('Registration failed', response);
                setError('Registration failed. Please try again.');
                setSuccess('');
            }
        } catch (error : any) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
                setError(error.response.data.description || 'Registration failed. Please try again.');
                setSuccess('');
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('No response from the server. Please try again later.');
                setSuccess('');
            } else {
                console.error('Error setting up the request:', error.message);
                setError('An error occurred. Please try again.');
                setSuccess('');
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="custom-form-container">
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br/>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                <br />
                <button type="submit" className="btn btn-dark">Register</button>
            </form>
        </div>
    );
};

export default Register;
