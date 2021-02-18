import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import { useHistory, Redirect } from "react-router-dom";
import { fetcher } from "../utils";

const LoginPage = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const [auth, setAuth] = useContext(AuthContext);
    const login = async (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        try {
            const response = await fetcher("/login/test", {
                method: 'POST',
                body: new URLSearchParams(form) // otherwise enctype would be multipart/formdata
            })
            setAuth(response.body);
            history.replace('/');
        } catch (err) {
            setError(response.message);
        }
    };
    return (
        <>
            {error}
            {auth ? <Redirect to="/" /> : (
                <div>
                    <form onSubmit={login}>
                        <input type="text" name="username" placeholder="Username" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                    <a href="/register">Sign Up</a>
                </div>
            )}
        </>

    );
}

export default LoginPage;