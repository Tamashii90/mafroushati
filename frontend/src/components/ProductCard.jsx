import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import ModifyCartBtn from "./ModifyCartBtn";
import CardImgPlaceholder from "./Placeholder/CardImg";

export default function ProductCard({ product }) {
	const { _id, name, img_url, price_per_piece, category, quantity_in_stock } = product;
	const [imgLoading, setImgLoading] = useState(true);
	const categoryName = category
		.split("+")
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join(" ")
		.replace("Tv", "TV");
	const [cart, dispatch] = useContext(CartContext);
	const alrdyInCart = () => {
		return cart.products.some(existingProd => existingProd._id === product._id);
	};
	return (
		<div className="col-12 my-3 product-card">
			<div className="row text-center justify-content-center">
				<div className="text-center">
					<Link to={`/products/${_id}`}>
						<CardImgPlaceholder
							style={{ width: "290px", height: "290px", display: imgLoading ? "block" : "none" }}
						/>
						<img
							className="p-3"
							src={img_url}
							alt={name}
							onLoad={() => setImgLoading(false)}
							style={{ width: "290px", height: "290px", display: imgLoading ? "none" : "block" }}
						/>
					</Link>
				</div>
				<p className="col-12 mt-2">{name}</p>
				<p className="col-12">
					<Link to={`/category/${category}`}>{categoryName}</Link>
				</p>
				<p className="col-12">{"$" + price_per_piece.toLocaleString("en-US")}</p>
				<p className="col-12">
					{quantity_in_stock > 0 ? (
						<span style={{ color: "green" }}>In Stock</span>
					) : (
						<span style={{ color: "red" }}>Out of Stock</span>
					)}
				</p>
				<div className="col-9 btn-group mb-4">
					{alrdyInCart() ? (
						<ModifyCartBtn product={product} dispatch={dispatch} add={false} />
					) : (
						<ModifyCartBtn product={product} dispatch={dispatch} add={true} />
					)}
					<Link to={`/products/${_id}`} className="btn-secondary btn">
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
}
