import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import { Redirect } from "react-router-dom";

const RegisterPage = () => {
    const [error, setError] = useState({});
    const [auth, setAuth] = useContext(AuthContext);
    const register = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        try {
            const response = await fetch("/register/test", {
                method: 'POST',
                body: new URLSearchParams(form)
            }).then(res => res.json());
            if (response.error) {
                return setError(response.body);
            }
            setAuth(response.body);
        } catch (err) {
            setError({
                network: {
                    messge: "Netowork error."
                }
            })
        }
    };

    if (auth) return <Redirect to="/" />;
    return (
        <div>
            {error.network?.message}
            <form onSubmit={register}>
                <input type="text" name="username" placeholder="Username" /><br />
                {error.username?.message}<br />
                <input type="password" name="password" placeholder="Password" /><br />
                {error.password?.message}<br />
                <input type="password" name="pwdConfirm" placeholder="Repeat your password" /><br />
                {error.pwdConfirm?.message}<br />
                <button type="submit">Register</button>
            </form>
            <a href="/login">Log In</a>
        </div>
    );
}

export default RegisterPage;