import React, { useState, createContext } from 'react';


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState(null);
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;