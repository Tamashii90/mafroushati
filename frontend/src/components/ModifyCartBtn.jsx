import React, { useContext } from "react";
import InfoContext from "../context/InfoContext";

export default function ModifyCartBtn({ product, add, dispatch }) {
	// Ideally, I would want to have a separate setInfo (snackbar) for
	// each product, but for some reason the FeatuerdProds carousel
	// would mess up the styling of its snackbar so I'm just using
	// the header's snackbar (global state via context api)
	const [, setInfo] = useContext(InfoContext);
	const { _id, name, price_per_piece, quantity_in_stock, img_url } = product;
	const addProduct = () => {
		dispatch({
			type: "addProduct",
			payload: { _id, name, price_per_piece, img_url, quantity_in_stock }
		});
		setInfo({
			message: "Added To Cart.",
			severity: "success",
			delay: 800
		});
	};
	const removeProduct = () => {
		dispatch({ type: "removeProduct", payload: { _id, price_per_piece } });
		setInfo({
			message: "Removed From Cart.",
			severity: "success",
			delay: 800
		});
	};
	return (
		<>
			{add ? (
				<button
					className="btn-primary btn"
					onClick={addProduct}
					disabled={!quantity_in_stock}
				>
					Add To Cart
				</button>
			) : (
				<button className="btn-primary btn" onClick={removeProduct}>
					Remove From Cart
				</button>
			)}
		</>
	);
}
