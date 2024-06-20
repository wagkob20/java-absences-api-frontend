import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/login.css'; // Import custom CSS for login form
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../logic/AuthContext';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { saveToken } = useContext(AuthContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const body = {
            email: email.trim(),
            password: password.trim()
        };

        console.log("Sending login request with body:", body);  // Log the body to verify it

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const data = response.data;
                saveToken(data.token); // Save the token in context and local storage
                console.log(data.token);
                navigate("/changeFehlstunden");
            } else {
                console.error('Login failed', response);
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error : any) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
                setError(error.response.data.description || 'Login failed. Please check your credentials and try again.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('No response from the server. Please try again later.');
            } else {
                console.error('Error setting up the request:', error.message);
                setError('An error occurred. Please try again.');
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="custom-form-container">
            <form onSubmit={handleLogin}>
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
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
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
                <br />
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    );
};

export default Login;
