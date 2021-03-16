import React from "react";
import ProductCard from "./ProductCard";

export default function ProdsGallery({ products }) {
  return (
    <>
      {!products.length ? (
        <p className="col-12">No Products.</p>
      ) : (
        products.map(product => (
          <div key={product._id} className="col-10 col-md-6 col-lg-4">
            <ProductCard product={product} key={product._id} />
          </div>
        ))
      )}
    </>
  );
}
