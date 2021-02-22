import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import { InfoContextProvider } from "./context/InfoContext";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <AuthContextProvider>
      <CartContextProvider>
        <InfoContextProvider>
          <App />
        </InfoContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
