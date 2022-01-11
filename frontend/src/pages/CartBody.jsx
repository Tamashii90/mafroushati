import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import PayPalBtn from "../components/Cart/PayPalBtn";

function CartBody() {
	const [cart] = useContext(CartContext);

	const [auth] = useContext(AuthContext);
	const { products } = cart;
	const { total } = cart;
	const listOfProds = products.map(prod => ({
		_id: prod._id,
		quantity: prod.quantityInCart
	}));

	if (!auth) {
		toast.info(" Please Log in or Register First.");
		return <Redirect to="/login" />;
	}

	if (!cart.products.length) {
		return (
			<div className="container">
				<h4 className="text-center">Your Cart is Empty.</h4>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 row align-items-end my-3">
					<div className="col d-none d-lg-block" style={{ height: "75px", width: "75px" }}></div>
					<div className="col text-center">Product</div>
					<div className="col text-center">Price Per Piece</div>
					<div className="col text-center">Quantity</div>
					<div className="col text-center">Total Price</div>
				</div>
				{products.map(product => (
					<CartItem key={product._id} product={product} />
				))}
				<div className="col-12 mt-4">
					<h3>Total: {"$" + total.toLocaleString("en-US")}</h3>
				</div>
				<div className="col-12 my-3 row justify-content-center">
					<div className="w-50 text-center">
						<PayPalBtn listOfProds={listOfProds} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartBody;
