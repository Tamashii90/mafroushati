import React from "react";
import ProductCard from "./ProductCard";
import "../scss/product-card.scss";

export default function ProdsGallery({ products, setInfo }) {
  return (
    <>
      {products.map(product => (
        <div key={product._id} className="col-10 col-md-6 col-lg-4">
          <ProductCard product={product} key={product._id} setInfo={setInfo} />
        </div>
      ))}
    </>
  );
}
