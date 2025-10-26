import React, { useState, useEffect } from "react";
import { UserAuthContext } from "./UserAuthContext";

export default function UserAuthContextProvider({ children }) {
    
    
    const [UserToken, setUserToken] = useState(() => {
        return localStorage.getItem("UserToken") || null;
    });

    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem("userData");
        return savedData ? JSON.parse(savedData) : null;
    });

    useEffect(() => {
        if (UserToken) {
            localStorage.setItem("UserToken", UserToken);
        } else {
            localStorage.removeItem("UserToken");
        }
    }, [UserToken]);

    useEffect(() => {
        if (userData) {
            localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            localStorage.removeItem("userData");
        }
    }, [userData]);

    return (
        <UserAuthContext.Provider value={{ UserToken, setUserToken, userData, setUserData }}>
            {children}
        </UserAuthContext.Provider>
    );
}
