import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Redirect, Link } from "react-router-dom";
import { fetcher } from "../utils";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [auth, setAuth] = useContext(AuthContext);
  const register = async e => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const response = await fetcher("/api/register/test", {
        method: "POST",
        body: new URLSearchParams(form)
      });
      setAuth(response.body);
    } catch (err) {
      if (err.body) setError(err.body);
      else setInfo({ message: err.message, severity: "error" });
    }
    setLoading(false);
  };

  if (auth) return <Redirect to="/" />;
  return (
    <div>
      <form onSubmit={register}>
        <input type="text" name="username" placeholder="Username" />
        <br />
        {error.username?.message}
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        {error.password?.message}
        <br />
        <input
          type="password"
          name="pwdConfirm"
          placeholder="Repeat your password"
        />
        <br />
        {error.pwdConfirm?.message}
        <br />
        <button type="submit">
          Register
          {loading && (
            <span className="ml-2 spinner-grow spinner-grow-sm"></span>
          )}
        </button>
      </form>
      <Link to="/login">Log In</Link>
    </div>
  );
}
