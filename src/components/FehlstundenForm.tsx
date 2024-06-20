import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/login.css'; // Import custom CSS
import axios from 'axios';
import { AuthContext } from '../logic/AuthContext';  // Assuming you have an AuthContext to provide the token

const FehlstundenForm = () => {
    const [fehlstunden, setFehlstunden] = useState<number>(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { token } = useContext(AuthContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const body = {
            date: new Date().toISOString().split('T')[0],  // Format date as YYYY-MM-DD
            hoursAbsent: fehlstunden
        };

        try {
            const response = await axios.post('http://localhost:8080/api/absences/record', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Assuming you need to pass a token for authentication
                }
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess('Fehlstunden successfully recorded!');
                setError('');
            } else {
                console.error('Submission failed', response);
                setError('Submission failed. Please try again.');
                setSuccess('');
            }
        } catch (error : any) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
                setError(error.response.data.description || 'Submission failed. Please try again.');
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fehlstunden">Fehlstunden</label>
                    <input
                        type="number"
                        className="form-control"
                        id="fehlstunden"
                        aria-describedby="fehlstundenHelp"
                        placeholder="Enter hours absent"
                        value={fehlstunden}
                        onChange={(e) => setFehlstunden(Number(e.target.value))}
                    />
                    <br/>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
            </form>
        </div>
    );
};

export default FehlstundenForm;
