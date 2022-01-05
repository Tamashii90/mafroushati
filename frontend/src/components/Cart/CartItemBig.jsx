import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import MySnackBar from "../MySnackbar";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";

export default function CartItemBig({ product, setProducts, setTotal }) {
	const [cart, dispatch] = useContext(CartContext);
	const [info, setInfo] = useState({ message: "", severity: "info" });
	const { _id, name, img_url, price_per_piece, quantity_in_stock } = product;
	const { quantityInCart } = cart.products.find(product => product._id === _id);
	const totalPrice = price_per_piece * quantityInCart;

	const incQty = () => {
		if (quantity_in_stock < quantityInCart + 1) {
			return setInfo({ message: "out of stock!", severity: "error" });
		}
		dispatch({ type: "incQty", payload: { _id, price_per_piece } });
		setTotal(prev => prev + price_per_piece);
	};

	const decQty = () => {
		if (quantityInCart - 1 === 0) {
			dispatch({
				type: "removeProduct",
				payload: { _id, price_per_piece }
			});
			setProducts(prevProds => prevProds.filter(prod => prod._id !== _id));
		} else {
			dispatch({ type: "decQty", payload: { _id, price_per_piece } });
		}
		setTotal(prev => prev - price_per_piece);
	};

	return (
		<div className="row py-4 py-lg-2">
			{info.message && <MySnackBar info={info} setInfo={setInfo} />}
			<div className="col-5 text-center text-lg-left">
				<img
					className="mx-4 d-none d-lg-inline"
					src={img_url}
					alt={name}
					width="75"
					height="75"
				/>
				<span>{name}</span>
			</div>
			<div className="col text-center align-self-center">
				{"$" + price_per_piece.toLocaleString("en-US")}
			</div>
			<div className="col text-center align-self-center">
				<AiFillPlusSquare className="mx-1 cart-svg" size="2em" onClick={incQty} />
				{quantityInCart}
				<AiFillMinusSquare className="mx-1 cart-svg" size="2em" onClick={decQty} />
			</div>
			<div className="col text-center align-self-center">
				{"$" + totalPrice.toLocaleString("en-US")}
			</div>
		</div>
	);
}
