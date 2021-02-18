import React from "react";

export default function ModifyCartBtn({ product, add, dispatch, setInfo }) {
  const { _id, price_per_piece, quantity_in_stock } = product;
  const addProduct = () => {
    dispatch({ type: "addProduct", payload: { _id, price_per_piece } });
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
