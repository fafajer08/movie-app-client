
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const UserContext = createContext();

export const UserProvider = ({ children}) => {

    const [ user, setUser ] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(token);
        }  else {
            setUser(null);
        }
    }, [])

    const login = (data) => {
        localStorage.setItem('token', data.access);
        setUser(jwtDecode(data.access));
        console.log('userContext', user);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

  
        return (
            <UserContext.Provider value={{user, login, logout}}>
                {children}
            </UserContext.Provider>
        );
    }