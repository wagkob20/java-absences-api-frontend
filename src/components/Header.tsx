import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/header.css'; // Import custom CSS
import { AuthContext } from '../logic/AuthContext';

const Header = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <a className="navbar-brand">Fehlstundenliste</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto custom-nav-links">
                        <li className="nav-item">
                            <Link to="/studentlist" className="nav-link">Studentlist</Link>
                        </li>
                        {token && (
                            <li className="nav-item">
                                <Link to="/changeFehlstunden" className="nav-link">Fehlstunden eintragen</Link>
                            </li>
                        )}
                        {!token && (
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        )}
                        {token ? (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn custom-logout-btn">Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link custom-login-link">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
