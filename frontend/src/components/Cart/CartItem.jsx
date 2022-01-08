import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import MySnackBar from "../MySnackbar";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";

function CartItem({ product, setProducts, setTotal }) {
	const { _id, name, img_url, price_per_piece, quantity_in_stock, quantityInCart } = product;
	const [info, setInfo] = useState({ message: "", severity: "info" });
	const [cart, dispatch] = useContext(CartContext);
	const totalPrice = price_per_piece * quantityInCart;

	const incQty = () => {
		if (quantity_in_stock < quantityInCart + 1) {
			return setInfo({ message: "Out of Stock!", severity: "error" });
		}
		dispatch({ type: "incQty", payload: { _id, price_per_piece } });
	};

	const decQty = () => {
		if (quantityInCart - 1 === 0) {
			dispatch({
				type: "removeProduct",
				payload: { _id, price_per_piece }
			});
		} else {
			dispatch({ type: "decQty", payload: { _id, price_per_piece } });
		}
	};

	return (
		<div className="col-12 row align-items-baseline py-4 py-lg-2">
			{info.message && <MySnackBar info={info} setInfo={setInfo} />}
			<div className="col text-center d-none d-lg-block">
				<img width="75" height="75" src={img_url} alt={name} />
			</div>
			<div className="col text-center text-lg-left">
				<span>{name}</span>
			</div>
			<div className="col text-center">
				<span>{"$" + price_per_piece.toLocaleString("en-US")}</span>
			</div>
			<div className="col text-center">
				<span>
					<AiFillPlusSquare className="mx-1 cart-svg" size="2em" onClick={incQty} />
					{quantityInCart}
					<AiFillMinusSquare className="mx-1 cart-svg" size="2em" onClick={decQty} />
				</span>
			</div>
			<div className="col text-center">
				<span>{"$" + totalPrice.toLocaleString("en-US")}</span>
			</div>
		</div>
	);
}

export default CartItem;
