import React from "react";
import { TextRow } from "react-placeholder/lib/placeholders";
import CartItemPlaceholder from "./CartItemBig";

export default function Placeholder() {
  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12">
          <div className="row my-3">
            <div className="col text-center">Product</div>
            <div className="col text-center">Price Per Piece</div>
            <div className="col text-center">Quantity</div>
            <div className="col text-center">Total Price</div>
          </div>
        </div>
        <div className="col-12">
          {[1, 2, 3].map((_, idx) => (
            <CartItemPlaceholder key={idx} />
          ))}
        </div>
        <div className="col-12 my-3">
          <h3>
            {"Total: "}
            <TextRow
              className="placeholder-animated ml-2"
              color="#E0E0E0"
              style={{
                display: "inline-block",
                width: 70,
                height: 20
              }}
            />
          </h3>
        </div>
        <div className="col-12 my-4">
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
}
