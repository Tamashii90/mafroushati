import React, { useEffect, useContext, lazy, Suspense } from "react";
import Header from "./components/Header";
import MainBody from "./pages/MainBody";
import { Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Helmet from "react-helmet";
import { fetcher } from "./utils";

const ProductBody = lazy(() => import("./pages/ProductBody"));
const CategoryBody = lazy(() => import("./pages/CategoryBody"));
const CartBody = lazy(() => import("./pages/CartBody"));
const LoginBody = lazy(() => import("./pages/LoginBody"));
const RegisterBody = lazy(() => import("./pages/RegisterBody"));
const SearchBody = lazy(() => import("./pages/SearchBody"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={MainBody} />
            <Route exact path="/category/:category" component={CategoryBody} />
            <Route exact path="/products/:_id" component={ProductBody} />
            <Route exact path="/cart" component={CartBody} />
            <Route exact path="/login" component={LoginBody} />
            <Route exact path="/register" component={RegisterBody} />
            <Route exact path="/search" component={SearchBody} />
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
