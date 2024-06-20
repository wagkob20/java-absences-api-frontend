import React, { createContext, useState, useEffect } from 'react';

// Create a context for the auth state
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Load the token from local storage when the app starts
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const saveToken = (userToken) => {
        localStorage.setItem('authToken', userToken);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, saveToken, logout }}>
    {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;
