import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute(props) {
  const [auth] = useContext(AuthContext);
  if (auth) return <Route {...props} />;
  return <Redirect to="/login" />;
}
