import React, { useEffect, useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainBody from "./pages/MainBody";
import { Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Helmet from "react-helmet";
import { fetcher } from "./utils";

import ProductBody from "./pages/ProductBody";
import CategoryBody from "./pages/CategoryBody";
import CartBody from "./pages/CartBody";
import LoginBody from "./pages/LoginBody";
import RegisterBody from "./pages/RegisterBody";
import SearchBody from "./pages/SearchBody";
import "./styles/all.scss";

export default function App() {
  const [, setAuth] = useContext(AuthContext);
  useEffect(() => {
    async function authenticate() {
      try {
        const response = await fetcher("/api/current_user");
        setAuth(response.body);
      } catch (err) {}
    }
    authenticate();
  }, []);
  return (
    <>
      <header>
        <Helmet>
          <title>Mafroushati</title>
        </Helmet>
        <Header />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={MainBody} />
          <Route exact path="/category/:category" component={CategoryBody} />
          <Route exact path="/products/:_id" component={ProductBody} />
          <Route exact path="/cart" component={CartBody} />
          <Route exact path="/login" component={LoginBody} />
          <Route exact path="/register" component={RegisterBody} />
          <Route exact path="/search" component={SearchBody} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}
