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
    <div className="container form-container mb-5">
      <h2 className="text-center">Register An Account</h2>
      <form onSubmit={register}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <small className="form-text text-danger">
            {error.username?.message}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <small className="form-text text-danger">
            {error.password?.message}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="pwdConfirm">Repeat Password</label>
          <input
            className="form-control"
            type="password"
            id="pwdConfirm"
            name="pwdConfirm"
            placeholder="Repeat your password"
            required
          />
          <small className="form-text text-danger">
            {error.pwdConfirm?.message}
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
          {loading && (
            <span className="ml-2 spinner-grow spinner-grow-sm"></span>
          )}
        </button>
      </form>
      <Link to="/login">Already a member ?</Link>
    </div>
  );
}
