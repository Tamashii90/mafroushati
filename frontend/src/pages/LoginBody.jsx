import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useHistory, Redirect } from "react-router-dom";
import { fetcher } from "../utils";
import InfoContext from "../context/InfoContext";

const LoginPage = () => {
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
        <div>
          <form onSubmit={login}>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">
              Login
              {loading && (
                <span className="ml-2 spinner-grow spinner-grow-sm"></span>
              )}
            </button>
          </form>
          <Link to="/register">Sign Up</Link>
        </div>
      )}
    </>
  );
};

export default LoginPage;
