import React, { useContext } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import CartContext from "../../context/CartContext";
import { fetcher } from "../../utils";

export default function PayPalBtn({ listOfProds }) {
	const [, dispatch] = useContext(CartContext);

	const history = useHistory();
	// I have to do it like this because I need it inside PayPal button, and
	// I can't make it re-render when listOfProds changes (because of the iframe)
	if (window.paypal) window.paypal.listOfProds = listOfProds;

	async function createOrder(data, actions) {
		const { listOfProds } = window.paypal;
		try {
			const res = await fetcher("/api/cart/create-order", {
				method: "POST",
				body: JSON.stringify({ listOfProds }),
				headers: { "Content-Type": "application/json" }
			});
			if (!res.error) {
				return res.orderID;
			}
		} catch (err) {
			toast.erorr(err.message);
		}
	}

	async function captureOrder(data, actions) {
		try {
			const res = await fetch(`/api/cart/checkout/${data.orderID}`, { method: "post" });
			if (!res.ok) {
				throw new Error("Server error..");
			}
			// some delay to wait for PayPal's overlay to close
			setTimeout(() => {
				dispatch({ type: "clearCart" });
				toast.success("Thanks for Shopping at Mafroushati !", { autoClose: 2500 });
				history.replace("/");
			}, 1000);
		} catch (err) {
			toast.error(err.message);
		}
		// const orderData = await res.json();
		// // Three cases to handle:
		// //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
		// //   (2) Other non-recoverable errors -> Show a failure message
		// //   (3) Successful transaction -> Show confirmation or thank you
		// // This example reads a v2/checkout/orders capture response, propagated from the server
		// // You could use a different API or structure for your 'orderData'
		// const errorDetail = Array.isArray(orderData.details) && orderData.details[0];
		// if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
		// 	return actions.restart(); // Recoverable state, per:
		// }
		// if (errorDetail) {
		// 	const msg = "Sorry, your transaction could not be processed.";
		// 	if (errorDetail.description) msg += "\n\n" + errorDetail.description;
		// 	if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
		// 	return alert(msg); // Show a failure message (try to avoid alerts in production environments)
		// }
		// // Successful capture! For demo purposes:
		// console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
		// const transaction = orderData.purchase_units[0].payments.captures[0];
		// alert(
		// 	"Transaction " +
		// 		transaction.status +
		// 		": " +
		// 		transaction.id +
		// 		"\n\nSee console for all available details"
		// );
	}

	return (
		<>
			{!window.paypal ? (
				<h4>Can't connect to PayPal..</h4>
			) : (
				<PayPalButtons
					style={{ layout: "horizontal", label: "pay" }}
					createOrder={createOrder}
					onApprove={captureOrder}
				/>
			)}
		</>
	);
}
