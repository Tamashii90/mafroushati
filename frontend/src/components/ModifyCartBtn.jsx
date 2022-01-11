import React, { useContext } from "react";
import { toast } from "react-toastify";

export default function ModifyCartBtn({ product, add, dispatch }) {
	const { _id, name, price_per_piece, quantity_in_stock, img_url } = product;
	const addProduct = () => {
		dispatch({
			type: "addProduct",
			payload: { _id, name, price_per_piece, img_url, quantity_in_stock }
		});
		toast.success("Added to Cart.", { autoClose: 1000 });
	};
	const removeProduct = () => {
		dispatch({ type: "removeProduct", payload: { _id, price_per_piece } });
		toast.success("Removed from Cart", { autoClose: 1000 });
	};
	return (
		<>
			{add ? (
				<button className="btn-primary btn" onClick={addProduct} disabled={!quantity_in_stock}>
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
