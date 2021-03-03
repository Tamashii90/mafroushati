import React, { useContext, useState } from "react";
import "../scss/product-card.scss";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import CartContext from "../context/CartContext";
import ModifyCartBtn from "./ModifyCartBtn";

export default function ProductCard({ product }) {
  const {
    _id,
    name,
    img_url,
    price_per_piece,
    category,
    quantity_in_stock
  } = product;
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
    <div className="col-12 bg-danger my-3">
      <div className="row text-center justify-content-center">
        {/* <LazyLoad once height={400} offset={200}> */}
        <div className="text-center">
          <img
            className="px-3 py-4"
            src={img_url}
            alt={name}
            style={{ width: "290px", height: "290px" }}
          />
        </div>
        {/* </LazyLoad> */}
        <p className="col-12 mt-2">{name}</p>
        <p className="col-12">
          <Link to={`/category/${category}`}>{categoryName}</Link>
        </p>
        <p className="col-12">
          Price: {"$" + price_per_piece.toLocaleString("en-US")}
        </p>
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
