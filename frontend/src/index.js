import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
	<BrowserRouter>
		<ScrollToTop />
		<AuthContextProvider>
			<PayPalScriptProvider
				options={{
					"client-id":
						"AXuHC6i6knXy5dNRneTyBehNlomS4k7tPIgCt2OWLBU5MluaHf4XhxyIlLC_wo-6now3jEFolM-iMBLJ"
				}}
			>
				<CartContextProvider>
					<App />
				</CartContextProvider>
			</PayPalScriptProvider>
		</AuthContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
