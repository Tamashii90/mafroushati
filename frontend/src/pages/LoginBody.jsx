import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useHistory, Redirect } from "react-router-dom";
import { fetcher } from "../utils";
import InfoContext from "../context/InfoContext";

export default function LoginPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [, setInfo] = useContext(InfoContext);
  const [auth, setAuth] = useContext(AuthContext);
  const login = async e => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    try {
      const response = await fetcher("/api/login/test", {
        method: "POST",
        body: new URLSearchParams(form) // otherwise enctype would be multipart/formdata
      });
      setAuth(response.body);
      history.replace("/");
    } catch (err) {
      setLoading(false);
      setInfo({ message: err.message, severity: "error" });
    }
  };
  return (
    <>
      {auth ? (
        <Redirect to="/" />
      ) : (
        <div className="form-container container">
          <h2 className="text-center">Log In to Your Account</h2>
          <form onSubmit={login}>
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
            </div>
            <button type="submit" className="btn btn-primary">
              Login
              {loading && (
                <span className="ml-2 spinner-grow spinner-grow-sm"></span>
              )}
            </button>
          </form>
          <Link to="/register">Don't have an account ?</Link>
        </div>
      )}
    </>
  );
}
