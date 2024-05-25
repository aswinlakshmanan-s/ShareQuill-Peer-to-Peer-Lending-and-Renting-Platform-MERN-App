import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [hasaccessToken, setHasAccessToken] = useState(false);
    

    useEffect(() => {
        const accessTokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userAccessToken='));

        if (accessTokenCookie) {
        const [, token] = accessTokenCookie.split('=');
        setAccessToken(token);
        setHasAccessToken(true);
        }
    });

    return (
        <AuthContext.Provider value={{ accessToken, hasaccessToken }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};