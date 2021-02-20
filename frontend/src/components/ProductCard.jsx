import React, { useContext, useState } from "react";
import "../scss/product-card.scss";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import CartContext from "../context/CartContext";
import ModifyCartBtn from "./ModifyCartBtn";

export default function ProductCard({ product }) {
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
            src={product.img_url}
            alt={product.name}
            style={{ width: "290px", height: "290px" }}
          />
        </div>
        {/* </LazyLoad> */}
        <p className="col-12 mt-2">{product.name}</p>
        <p className="col-12">
          Price: {"$" + product.price_per_piece.toLocaleString("en-US")}
        </p>
        <p className="col-12">
          {product.quantity_in_stock > 0 ? (
            <span style={{ color: "green" }}>In Stock</span>
          ) : (
            <span style={{ color: "red" }}>Out of Stock</span>
          )}
        </p>
        <p className="col-12">
          Added {new Date(product.createdAt).toISOString().slice(0, 10)}
        </p>
        <div className="col-9 btn-group mb-4">
          {alrdyInCart() ? (
            <ModifyCartBtn product={product} dispatch={dispatch} add={false} />
          ) : (
            <ModifyCartBtn product={product} dispatch={dispatch} add={true} />
          )}
          <Link to={`/products/${product._id}`} className="btn-secondary btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
